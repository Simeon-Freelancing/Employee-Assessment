export const sampleOrganizations = [
  {
    id: 'org-001',
    name: 'Acme Robotics',
    createdAt: '2025-01-12T10:15:00.000Z',
    assessments: [
      {
        id: 'a-1001',
        domainId: 'd-1001',
        takenAt: '2025-03-01T14:00:00.000Z',
        status: 'completed',
        score: 78,
        reportSummary: 'Good maturity in data infra; needs governance improvements.',
      },
      {
        id: 'a-1002',
        domainId: 'd-1002',
        takenAt: '2025-04-05T09:30:00.000Z',
        status: 'in-progress',
        score: null,
        reportSummary: null,
      },
    ],
  },
  {
    id: 'org-002',
    name: 'BlueWave Analytics',
    createdAt: '2024-11-20T08:45:00.000Z',
    assessments: [
      {
        id: 'a-2001',
        domainId: 'd-2001',
        takenAt: '2025-02-10T11:20:00.000Z',
        status: 'completed',
        score: 92,
        reportSummary: 'Strong ML capability and tooling; excellent documentation.',
      },
    ],
  },
];
