export const calculateDomainScore = (responses, domainId) => {
  // Handle both object format (from context) and array format (from API)
  let domainResponses = [];
  
  if (Array.isArray(responses)) {
    // API array format: { id, assessment_id, question_id, score, comments }
    domainResponses = responses.filter((r) => {
      if (!r.question_id || r.score == null) return false;
      return r.question_id >= (domainId - 1) * 10 + 1 && r.question_id <= domainId * 10;
    });
  } else {
    // Object format: { questionId: score }
    domainResponses = Object.entries(responses).filter(([qId]) => {
      const id = parseInt(qId);
      return id >= (domainId - 1) * 10 + 1 && id <= domainId * 10;
    });
  }
  
  if (domainResponses.length === 0) return 0;
  
  const sum = domainResponses.reduce((acc, item) => {
    const score = Array.isArray(responses) ? item.score : item[1];
    return acc + score;
  }, 0);
  return sum / domainResponses.length;
};

export const calculateOverallScore = (responses) => {
  // Handle both array and object formats
  if (Array.isArray(responses) && responses.length === 0) return 0;
  if (!Array.isArray(responses) && Object.keys(responses).length === 0) return 0;
  
  const domainScores = [];
  for (let i = 1; i <= 10; i++) {
    const score = calculateDomainScore(responses, i);
    if (score > 0) domainScores.push(score);
  }
  
  if (domainScores.length === 0) return 0;
  return domainScores.reduce((a, b) => a + b, 0) / domainScores.length;
};

export const getReadinessLevel = (score) => {
  if (score >= 4.1) return { level: 'High Readiness', color: '#10b981' };
  if (score >= 3.1) return { level: 'Moderate', color: '#0891b2' };
  if (score >= 2.1) return { level: 'Developing', color: '#f59e0b' };
  return { level: 'Low Readiness', color: '#ef4444' };
};

export const getCompletionPercentage = (responses) => {
  const totalQuestions = 100;
  const answered = Object.keys(responses).length;
  return Math.round((answered / totalQuestions) * 100);
};
