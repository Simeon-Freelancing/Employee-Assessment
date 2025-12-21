import React, { createContext, useState, useContext } from 'react';
import { DOMAINS } from '../data/domains';
import { createReport } from '../lib/api';

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState({}); // new: optional textual comments per question
  const [currentDomain, setCurrentDomain] = useState(1);
  const [assessmentStarted, setAssessmentStarted] = useState(false);

  // metadata
  const [organizationId, setOrganizationId] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);

  const updateResponse = (questionId, score) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const updateComment = (questionId, text) => {
    setComments(prev => ({
      ...prev,
      [questionId]: text
    }));
  };

  const resetAssessment = () => {
    setResponses({});
    setComments({});
    setCurrentDomain(1);
    setAssessmentStarted(false);
    setOrganizationId(null);
    setAssessmentId(null);
  };

  const startAssessment = () => {
    setAssessmentStarted(true);
  };

  // Build the request payload expected by backend using current responses + comments
  const buildReportPayload = () => {
    // DOMAINS is expected to be an array with { id, name, questions: [{ id, ... }] }
    const domains = DOMAINS.map((d) => {
      const questions = (d.questions || []).map((q) => {
        const qid = q.id || q.question_id || q.key || q.questionId || q.name;
        return {
          question_id: qid,
          score: responses[qid] != null ? responses[qid] : null,
          comment: comments[qid] || '',
        };
      });
      return {
        domain_id: String(d.id),
        domain_name: d.name,
        questions,
      };
    });

    // simple overall score: average of known numeric responses (keep calculation on backend too)
    const numericScores = Object.values(responses).filter(v => typeof v === 'number');
    const overall_score = numericScores.length > 0
      ? numericScores.reduce((s, v) => s + v, 0) / numericScores.length
      : 0;

    const payload = {
      organization_id: organizationId || '',
      assessment_id: assessmentId || `assess_${Date.now()}`,
      domains,
      overall_score,
    };

    return payload;
  };

  // request report (calls API layer). returns the report object or throws.
  const generateReport = async () => {
    const payload = buildReportPayload();
    // createReport returns an axios-like object with data.report or data
    const resp = await createReport(payload);
    // normalize
    const result = resp && resp.data ? (resp.data.report || resp.data) : resp;
    return result;
  };

  return (
    <AssessmentContext.Provider value={{
      responses,
      comments,
      currentDomain,
      assessmentStarted,
      organizationId,
      assessmentId,
      updateResponse,
      updateComment,
      setCurrentDomain,
      setOrganizationId,
      setAssessmentId,
      resetAssessment,
      startAssessment,
      buildReportPayload,
      generateReport,
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}
