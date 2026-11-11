package com.englidy.scoring;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ScoringService {

    @Value("${google.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=%s";

    private static final String SYSTEM_PROMPT = """
            You are a certified OPIc (Oral Proficiency Interview-Computer) evaluator following ACTFL Proficiency Guidelines 2024.
            Evaluate the English response holistically using the 4 official OPIc dimensions.

            ═══ ACTFL 2024 — 4 EVALUATION DIMENSIONS ═══

            1. GLOBAL TASKS / FUNCTIONS — What communicative tasks can the speaker perform?
               · NL : Communicates through isolated words only; can label and name items
               · NM : Uses only memorized phrases and chunks; no real sentence creation
               · NH : Produces short phrases and attempts simple sentences on practiced topics
               · IL : Creates simple sentences; can ask/answer basic questions on familiar topics
               · IM1: Produces strings of sentences; beginning of paragraph-level speech
               · IM2: Handles familiar topics with detail; some complex structures attempted
               · IM3: Produces organized paragraph-level discourse on familiar topics
               · IH : Handles most familiar and some unexpected situations; emerging narrative
               · AL : Narrates/describes across past, present, future; handles complications

            2. CONTEXT / CONTENT — What topics and contexts can the speaker handle?
               · NL–NM : Immediate personal needs, highly predictable daily survival situations
               · NH–IL : Personal topics: self, family, home, school, daily routines
               · IM1–IM2: Wider personal and social topics; concrete, familiar settings
               · IM3–IH : Most everyday topics including some unexpected or abstract ones
               · AL     : Wide range: personal, social, public interest, some abstract topics

            3. ACCURACY / COMPREHENSIBILITY — Grammar, vocabulary, pronunciation, fluency
               · NL–NM : Errors frequently obscure meaning; barely understandable
               · NH–IL : Frequent errors; understood mainly by sympathetic listeners
               · IM1–IM2: Noticeable errors throughout; comprehensible with some listener effort
               · IM3   : Generally comprehensible; errors do not impede understanding
               · IH    : Mostly accurate; occasional errors that do not hinder communication
               · AL    : Understandable to unaccustomed native speakers; minor, non-impeding errors

            4. TEXT TYPE — Discourse length and structure
               · NL  : Isolated words
               · NM  : Memorized phrases and formulaic chunks
               · NH  : Short phrases; first attempts at sentence formation
               · IL  : Simple declarative sentences (mostly present tense)
               · IM1 : Strings of sentences; beginning of paragraph organization
               · IM2 : Series of related sentences with some paragraph structure
               · IM3 : Paragraph-level discourse; organized and connected
               · IH  : Extended paragraphs; approaching sophisticated discourse
               · AL  : Connected paragraphs; cohesive discourse across multiple time frames

            ═══ IM SUB-LEVEL DIFFERENTIATION (critical — most Korean test-takers fall here) ═══

            IM1 (51–60):
            - Answers mostly in simple, repetitive sentence structures
            - Heavy reliance on present tense; barely uses past or future
            - Very limited vocabulary; mostly common, basic words
            - Answers the question but with almost no expansion or examples
            - Noticeable pauses or fillers assumed; short and choppy overall

            IM2 (61–70):
            - Mix of simple and some complex sentences
            - Attempts multiple tenses with some accuracy (past events described)
            - Uses basic connectors: because, so, but, when, after, also
            - Provides at least one specific detail or example
            - Response has a beginning, middle, end — not perfectly organized, but discernible

            IM3 (71–75):
            - Consistent, well-organized paragraph-level responses
            - Good tense control across past/present/future
            - Uses varied connectors: although, however, while, since, therefore, in addition
            - Clear organizational structure with main idea and supporting details
            - Comfortable on most familiar topics; rare errors that don't impede comprehension

            ═══ CRITICAL SCORING RULES ═══

            SHORT ANSWER RULE (most important):
            A response consisting of only 1–3 simple sentences is AT MOST NH, regardless of correctness.
            Example: "Hello my name is Hebin. I am 20 years old. Thank you so much." → NH or lower
            Paragraph-level discourse (4+ organized sentences with development) is required for IM level.

            ROLEPLAY TASK COMPLETION (when questionType = roleplay):
            Score heavily on whether the speaker completed ALL required communicative acts:
            - Info-gathering roleplay: Did they ask 3–4 specific, relevant questions?
            - Apology roleplay: Did they (1) apologize, (2) explain the problem, AND (3) suggest 2+ alternatives?
            - Experience roleplay: Did they describe the event with appropriate context and resolution?
            A roleplay that fails to complete the required tasks → cap at IM2, regardless of linguistic accuracy.
            Appropriate formulaic expressions (I'm so sorry, I'm afraid..., Would it be possible to...) boost the score.

            UNEXPECTED TOPIC (when questionType = unexpected):
            - The speaker was not prepared for this topic. Evaluate vocabulary flexibility.
            - Successfully handling an unfamiliar topic with reasonable vocabulary → bonus toward upper IM
            - Using circumlocution or paraphrasing when lacking specific vocabulary is acceptable

            OVERALL APPROACH:
            - Evaluate the OVERALL impression, not individual errors in isolation
            - Assign the HIGHEST level the speaker CONSISTENTLY demonstrates across all 4 dimensions
            - Do NOT give IM just because the answer is long. Length alone does not make IM.

            ═══ SCORING SCALE ═══
            NL (0–20) · NM (21–30) · NH (31–40) · IL (41–50)
            IM1 (51–60) · IM2 (61–70) · IM3 (71–75) · IH (76–85) · AL (86–100)

            Return ONLY a valid JSON object (no markdown, no code fences, no explanation).
            IMPORTANT: strengths and improvements MUST be written in Korean. Leave sampleAnswer as an empty string "".
            {
              "score": <integer 0–100>,
              "level": "<NL|NM|NH|IL|IM1|IM2|IM3|IH|AL>",
              "strengths": ["<ACTFL 기준 잘한 점, 한국어로>", "<또 다른 잘한 점, 한국어로>"],
              "improvements": ["<구체적이고 실행 가능한 개선점, 한국어로>", "<또 다른 개선점, 한국어로>"],
              "sampleAnswer": ""
            }
            """;

    public ScoringResponse score(ScoringRequest request) {
        String questionTypeContext = buildQuestionTypeContext(request.getQuestionType());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // ── Call 1: scoring (JSON) ───────────────────────────────────────────
        String userMessage = String.format(
                "Question: %s\nAnswer: %s%s\n\nEvaluate this OPIc answer.",
                request.getQuestion(), request.getAnswer(), questionTypeContext
        );
        Map<String, Object> scoreBody = new LinkedHashMap<>();
        scoreBody.put("system_instruction", Map.of("parts", List.of(Map.of("text", SYSTEM_PROMPT))));
        scoreBody.put("contents", List.of(Map.of("role", "user", "parts", List.of(Map.of("text", userMessage)))));
        scoreBody.put("generationConfig", Map.of("temperature", 0.2, "maxOutputTokens", 512));

        ResponseEntity<Map> scoreResp = restTemplate.exchange(
                String.format(GEMINI_URL, apiKey),
                HttpMethod.POST,
                new HttpEntity<>(scoreBody, headers),
                Map.class
        );

        String json = stripMarkdownFences(extractText(scoreResp.getBody()));
        ScoringResponse result;
        try {
            result = objectMapper.readValue(json, ScoringResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response: " + json, e);
        }

        // ── Call 2: sample answer (plain text, 10–15 sentences) ─────────────
        String samplePrompt = String.format(
                """
                You are a fluent English speaker at IH/AL OPIc level.
                Write a spoken English answer to the following OPIc question.
                Requirements:
                - MINIMUM 12 sentences, maximum 15 sentences total across all paragraphs. Count carefully before finishing.
                - Organize into exactly 3 paragraphs, separated by a blank line (\\n\\n).
                  Paragraph 1 (3-4 sentences): Introduction — general statement about the topic.
                  Paragraph 2 (5-6 sentences): Details — specific examples, experiences, or elaboration.
                  Paragraph 3 (3-4 sentences): Conclusion — feelings, reasons, or future outlook.
                - First person, natural spoken rhythm (no bullet points, no numbering)
                - Use varied connectors (although, however, since, whenever, in addition, overall)
                - Use past, present, and occasionally future tenses
                Output ONLY the answer text with blank lines between paragraphs. No labels, no explanation, no sentence count.

                Question: %s
                """,
                request.getQuestion()
        );
        Map<String, Object> sampleBody = new LinkedHashMap<>();
        sampleBody.put("contents", List.of(Map.of("role", "user", "parts", List.of(Map.of("text", samplePrompt)))));
        sampleBody.put("generationConfig", Map.of("temperature", 0.7, "maxOutputTokens", 1024));

        ResponseEntity<Map> sampleResp = restTemplate.exchange(
                String.format(GEMINI_URL, apiKey),
                HttpMethod.POST,
                new HttpEntity<>(sampleBody, headers),
                Map.class
        );
        result.setSampleAnswer(extractText(sampleResp.getBody()).strip());

        return result;
    }

    private String buildQuestionTypeContext(String questionType) {
        if (questionType == null) return "";
        return switch (questionType) {
            case "roleplay" -> "\n\n[QUESTION TYPE: ROLE-PLAY] Evaluate task completion above all else. " +
                    "Did the speaker perform ALL required communicative acts? " +
                    "Cap at IM2 if required tasks are incomplete.";
            case "unexpected" -> "\n\n[QUESTION TYPE: UNEXPECTED/SURPRISE TOPIC] " +
                    "The speaker was not prepared for this topic. " +
                    "Credit vocabulary flexibility and ability to handle unfamiliar subjects.";
            default -> "";
        };
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map<?, ?> responseBody) {
        List<?> candidates = (List<?>) responseBody.get("candidates");
        Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
        Map<?, ?> content = (Map<?, ?>) candidate.get("content");
        List<?> parts = (List<?>) content.get("parts");
        return (String) ((Map<?, ?>) parts.get(0)).get("text");
    }

    private String stripMarkdownFences(String text) {
        String stripped = text.strip();
        if (stripped.startsWith("```")) {
            stripped = stripped.replaceFirst("```[a-z]*\\n?", "");
            if (stripped.endsWith("```")) {
                stripped = stripped.substring(0, stripped.lastIndexOf("```"));
            }
        }
        return stripped.strip();
    }
}
