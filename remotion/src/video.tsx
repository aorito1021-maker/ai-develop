import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";

const COLORS = {
  background: "#0b1120",
  card: "#111827",
  accent: "#38bdf8",
  accentSoft: "rgba(56, 189, 248, 0.2)",
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5f5",
};

type Scene = {
  title: string;
  subtitle?: string;
  bullets: string[];
  highlight?: string;
};

export const SCENE_DURATION = 120;

export const SCENES: Scene[] = [
  {
    title: "アスクルがAI駆動開発に踏み切るべき理由",
    subtitle: "2024-2025の競争環境は待ってくれない",
    bullets: ["配送・調達の即応性が競争力の核心", "プロダクト開発の速度が企業価値を左右"],
  },
  {
    title: "市場環境は“スピード勝負”に移行",
    subtitle: "B2B ECは“早さ×精度”の戦い",
    bullets: [
      "価格競争だけでなくUX改善の頻度が差を生む",
      "AIで仕様検証・実装・検証のサイクルを短縮",
    ],
  },
  {
    title: "開発生産性を2〜3倍に引き上げる",
    subtitle: "AI支援で“作る時間”を“考える時間”へ",
    bullets: [
      "要件整理・設計レビューをAIが補助",
      "実装の自動化でリードタイムを圧縮",
      "リリース頻度を上げ、学習サイクルを高速化",
    ],
    highlight: "小さな改善を週単位で届けられる体制へ",
  },
  {
    title: "品質と安定性を同時に高める",
    subtitle: "AIテストで“検知漏れ”を減らす",
    bullets: [
      "テストケースの自動生成とレビュー",
      "ログ分析・障害予兆の早期検知",
      "属人化しがちな運用ノウハウを形式知化",
    ],
  },
  {
    title: "優秀な人材は“AI活用前提”で動く",
    subtitle: "開発体験の向上が採用力に直結",
    bullets: [
      "AI環境が整った職場は候補者の魅力に",
      "チームの心理的負荷を下げ、定着率を上げる",
      "育成スピードを高め、スキルの平準化",
    ],
  },
  {
    title: "次の一手：AI駆動開発ロードマップ",
    subtitle: "90日で“効果”を示す",
    bullets: [
      "1) 重要機能のAIペア実装を試行",
      "2) QA/運用データのAI活用を導入",
      "3) KPI: リードタイム・品質指標で効果検証",
    ],
    highlight: "今動けば、アスクルの“配送×開発”が武器になる",
  },
];

const gradient =
  "radial-gradient(circle at top, rgba(56, 189, 248, 0.25), transparent 60%), linear-gradient(135deg, #0b1120 10%, #0f172a 70%)";

const SceneSlide: React.FC<{ scene: Scene; startFrame: number }> = ({
  scene,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;
  const opacity = interpolate(
    localFrame,
    [0, 15, SCENE_DURATION - 15, SCENE_DURATION],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const translateY = interpolate(localFrame, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: gradient,
        color: COLORS.textPrimary,
        fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
        padding: "120px",
      }}
    >
      <div
        style={{
          background: COLORS.card,
          borderRadius: "32px",
          padding: "72px",
          boxShadow: "0 30px 80px rgba(15, 23, 42, 0.45)",
          border: `1px solid ${COLORS.accentSoft}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "28px",
              color: COLORS.accent,
              margin: 0,
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            ASKUL AI DEVELOPMENT
          </p>
          <h1
            style={{
              fontSize: "68px",
              marginTop: "24px",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            {scene.title}
          </h1>
          {scene.subtitle ? (
            <p
              style={{
                fontSize: "32px",
                marginTop: 0,
                marginBottom: "40px",
                color: COLORS.textSecondary,
              }}
            >
              {scene.subtitle}
            </p>
          ) : null}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "18px",
            }}
          >
            {scene.bullets.map((bullet) => (
              <li
                key={bullet}
                style={{
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    color: COLORS.accent,
                    fontSize: "24px",
                    marginTop: "8px",
                  }}
                >
                  ◆
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        {scene.highlight ? (
          <div
            style={{
              background: COLORS.accentSoft,
              borderRadius: "18px",
              padding: "24px 32px",
              fontSize: "30px",
              fontWeight: 600,
              color: COLORS.accent,
            }}
          >
            {scene.highlight}
          </div>
        ) : (
          <div
            style={{
              fontSize: "22px",
              color: COLORS.textSecondary,
              letterSpacing: "0.08em",
            }}
          >
            提案: AI駆動開発プロジェクト
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const AskulAIDevelopmentVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {SCENES.map((scene, index) => (
        <Sequence
          key={scene.title}
          from={index * SCENE_DURATION}
          durationInFrames={SCENE_DURATION}
        >
          <SceneSlide scene={scene} startFrame={index * SCENE_DURATION} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
