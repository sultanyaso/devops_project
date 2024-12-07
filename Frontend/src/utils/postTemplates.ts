export const postTemplates = {
  achievement: {
    professional: `I'm excited to announce that I've recently achieved [milestone]. This represents [impact] for our industry. I'm grateful for [acknowledgment].

Key highlights:
• [achievement1]
• [achievement2]
• [achievement3]

Looking forward to the next challenge! Thoughts?`,
    casual: `Hey LinkedIn fam! 🎉 Just wanted to share some exciting news - I [achievement]! Still can't believe it!

Here's what made it special:
• [highlight1]
• [highlight2]
• [highlight3]

Thanks to everyone who supported me along the way! 🙏`,
    enthusiastic: `🚀 INCREDIBLE NEWS! Just [achievement] and I'm absolutely BUZZING with excitement!

Here's what made it possible:
💫 [highlight1]
💫 [highlight2]
💫 [highlight3]

The journey continues! Who else is working towards similar goals? Let's connect! 🔥`,
    storytelling: `Six months ago, I faced [challenge]. Today, I'm proud to share that [achievement].

Here's how it unfolded:
1. [step1]
2. [step2]
3. [step3]

The biggest lesson? [lesson]

What challenges have you overcome recently?`
  },
  insight: {
    professional: `Recent industry analysis reveals [insight]. This trend indicates [implication] for professionals in [field].

Key observations:
• [point1]
• [point2]
• [point3]

What's your perspective on this development?`,
    casual: `Just had an interesting thought about [topic] 💡

Here's what I've noticed:
• [observation1]
• [observation2]
• [observation3]

Anyone else seeing similar patterns? Let's discuss! 🤔`,
    enthusiastic: `🔥 GAME-CHANGING INSIGHT ALERT! 🔥

Just discovered something incredible about [topic]:
⚡️ [point1]
⚡️ [point2]
⚡️ [point3]

Who else is excited about this? Let's revolutionize [industry]! 🚀`,
    storytelling: `Last week, I encountered [situation] that changed my perspective on [topic].

The revelation:
1. [insight1]
2. [insight2]
3. [insight3]

Has anyone experienced something similar?`
  }
};

export const fillTemplate = (template: string, variables: Record<string, string>): string => {
  let filledTemplate = template;
  Object.entries(variables).forEach(([key, value]) => {
    filledTemplate = filledTemplate.replace(`[${key}]`, value);
  });
  return filledTemplate;
};