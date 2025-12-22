# Employee Readiness Evaluation Application

A comprehensive mobile application for evaluating organizational Employee readiness across 10 critical domains.

## Features

### Assessment System
- **100 Questions**: 10 questions per domain across 10 evaluation areas
- **1-5 Scoring Scale**: Clear scoring guidance for each question
- **Progress Tracking**: Visual progress indicators and autosave functionality
- **Domain Coverage**:
  1. Leadership & Vision Alignment
  2. Work Environment & Culture
  3. Employee Engagement & Motivation
  4. Communication & Transparency
  5. Career Growth & Development
  6. Compensation, Rewards & Recognition
  7. Alignment, Values & Organizational Citizenship
  8. Managerial Effectiveness & Support
  9. Wellbeing, Workload & Work-Life Balance
  10. Feedback, Innovation & Continuous Improvement

### Dashboard & Analytics
- **Overall Readiness Score**: Aggregated score across all domains (1-5 scale)
- **Domain Breakdown**: Individual scores for each evaluation area
- **Visual Indicators**: Color-coded readiness levels
- **Progress Monitoring**: Track assessment completion

### Employee-Powered Insights
- **Contextual Recommendations**: Domain-specific improvement strategies
- **Strengths Analysis**: Identify high-performing areas
- **Weakness Identification**: Prioritize areas needing attention
- **Conversational Employee Assistant**: Ask questions and get personalized guidance

### Reporting
- **Executive Summary**: High-level readiness overview
- **Detailed Analysis**: Domain-by-domain breakdown
- **Action Plans**: Short, medium, and long-term recommendations
- **Export Capability**: Generate comprehensive reports

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: React Context API
- **Styling**: React Native StyleSheet

## Getting Started

```bash
# Install dependencies
npm install

# Start the app
npx expo start
```

## Navigation Structure

- **Home** (`/`): Landing page with feature overview
- **Assessment** (`/assessment`): Question-by-question evaluation
- **Dashboard** (`/dashboard`): Score overview and domain breakdown
- **Results** (`/results`): Detailed insights and recommendations
- **Employee Assistant** (`/ai-assistant`): Conversational help interface

## Scoring System

- **1.0-2.0**: Low Readiness - Foundation building required
- **2.1-3.0**: Developing - Basic capabilities emerging
- **3.1-4.0**: Moderate - Good progress with room for improvement
- **4.1-5.0**: High Readiness - Well-positioned for Employee adoption

## Key Components

- `DomainCard`: Display domain information and scores
- `QuestionCard`: Interactive question with scoring buttons
- `ScoreGauge`: Visual representation of readiness score
- `ProgressBar`: Assessment completion tracking
- `InsightCard`: Recommendations and analysis display

## Data Structure

Questions are organized by domain ID with the following structure:
```javascript
{
  id: number,
  text: string,
  guidance: string // 1-5 scoring criteria
}
```

## Future Enhancements

- Real ChatGPT API integration
- PDF/Word report export
- Historical comparison tracking
- Benchmark data against industry standards
- Multi-user role management (Admin, Assessor, Organization)
- Advanced data visualization (radar charts, trend lines)
