export const calculateDomainScore = (responses, domainId) => {
  // Handle both object format (from context) and array format (from API)
  let domainResponses = [];
  
  if (Array.isArray(responses)) {
    // API array format: { id, assessment_id, question_id, domain_id, score, comments }
    domainResponses = responses.filter((r) => {
      // Use domain_id to filter if available
      if (r.domain_id != null) {
        return Number(r.domain_id) === Number(domainId) && r.score != null;
      }
      // Fallback: check if question_id implies domain (legacy/sequential assumption)
      // But based on current data/questions.js, question_id is reuse 1..10
      // so this fallback might be incorrect if domain_id is missing. 
      // We assume domain_id is present as per createResponse.
      return false;
    });
  } else {
    // Object format: { "domainId_questionId": score }
    domainResponses = Object.entries(responses).filter(([key, value]) => {
      // Check for composite key prefix "domainId_"
      const prefix = `${domainId}_`;
      if (key.startsWith(prefix) && typeof value === 'number') {
        return true;
      }
      
      // Legacy fallback (if keys were just simple IDs 1..100)
      // This is no longer the case with current fix, but keeping strict check above is safer.
      return false;
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
