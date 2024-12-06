const industryHashtags: Record<string, string[]> = {
  technology: ['tech', 'innovation', 'digital', 'future', 'technology'],
  business: ['business', 'entrepreneurship', 'leadership', 'success', 'growth'],
  marketing: ['marketing', 'digitalmarketing', 'branding', 'socialmedia', 'strategy'],
  career: ['career', 'careeradvice', 'professionaldevelopment', 'jobsearch', 'networking'],
  personal: ['personalgrowth', 'motivation', 'inspiration', 'mindset', 'goals']
};

export const generateHashtags = (topic: string, count: number = 5): string[] => {
  const words = topic.toLowerCase().split(' ');
  const relevantTags: Set<string> = new Set();

  // Add topic-specific hashtags
  words.forEach(word => {
    Object.entries(industryHashtags).forEach(([category, tags]) => {
      if (word.includes(category) || category.includes(word)) {
        tags.forEach(tag => relevantTags.add(tag));
      }
    });
  });

  // Add general professional hashtags
  const generalTags = ['linkedin', 'networking', 'professional'];
  generalTags.forEach(tag => relevantTags.add(tag));

  return Array.from(relevantTags).slice(0, count);
};