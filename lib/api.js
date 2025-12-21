import axios from "axios";
import { sampleOrganizations } from '../data/organizations';
import { supabase } from "./supabase";
// Provide a simple synthetic in-memory store for development when backend is not available.
const syntheticStore = [...sampleOrganizations]; // initial dataset

// Synthetic store for assessments
let syntheticAssessments = [];


/**
 * Create Organization
 * formData: { name, industry, email, onboardDate, description, employeeSize, goals }
 */
export const createOrganization = async (formData) => {
  const payload = {
    name: formData.name ?? null,
    industry: formData.industry ?? null,
    email: formData.email ?? null,
    onboardDate: formData.onboardDate ?? new Date().toISOString(),
    description: formData.description ?? null,
    employeeSize: formData.employeeSize ?? null,
    goals: formData.goals ?? null,
  };

  const { data, error } = await supabase
    .from("organizations")
    .insert([payload])
    .select()
    .single();

  return { data, error };
};

/**
 * Get Organization by id
 * id: numeric id (bigint)
 */
export const getOrganization = async (id) => {
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return { data, error };
};

/**
 * Get Organization names (id + name)
 */
export const getOrganizationNames = async () => {
  const { data, error } = await supabase
    .from("organizations")
    .select("id,name")
    .order("id", { ascending: true });

  return { data, error };
};

/**
 * Create Assessment
 * payload: { org_id, status, overall_score, report_summary }
 */
export const createAssessment = async (payload) => {
  const insert = {
    org_id: payload.org_id ?? null,
    status: payload.status ?? "in-progress",
    overall_score: payload.overall_score ?? null,
    report_summary: payload.report_summary ?? null,
  };

  const { data, error } = await supabase
    .from("assessments")
    .insert([insert])
    .select()
    .single();

  return { data, error };
};

/**
 * Update Assessment
 * id: assessment id
 * updates: partial fields to update (completed_at, overall_score, status, report_summary...)
 */
export const updateAssessment = async (id, updates = {}) => {
  const { data, error } = await supabase
    .from("assessments")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

/**
 * Create Response
 * payload: { assessment_id, question_id, domain_id, score, comments }
 */
export const createResponse = async (payload) => {
  const insert = {
    assessment_id: payload.assessment_id,
    question_id: payload.question_id ?? null,
    domain_id: payload.domain_id ?? null,
    score: payload.score,
    comments: payload.comments ?? "",
  };

  const { data, error } = await supabase
    .from("responses")
    .insert([insert])
    .select()
    .single();

  return { data, error };
};

/**
 * Get Responses by assessment id
 */
export const getResponses = async (assessmentId) => {
  const { data, error } = await supabase
    .from("responses")
    .select("*")
    .eq("assessment_id", assessmentId)
    .order("id", { ascending: true });

  return { data, error };
};

/**
 * Update Response
 * id: response id
 * updates: { score, comments, ... }
 * score must be integer between 1 and 10 inclusive
 */
export const updateResponse = async (id, updates = {}) => {
  if (updates.score !== undefined) {
    const score = Number(updates.score);
    if (!Number.isInteger(score) || score < 1 || score > 10) {
      return { data: null, error: new Error("score must be an integer between 1 and 10") };
    }
    updates.score = score;
  }

  const { data, error } = await supabase
    .from("responses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

/**
 * Get Assessment(s) for org_id, optionally filtered by status
 */
export const getAssessment = async (orgId, status = null) => {
  let query = supabase.from("assessments").select("*").eq("org_id", orgId);
  if (status) query = query.eq("status", status);
  const { data, error } = await query.order("created_at", { ascending: false });
  return { data, error };
};
