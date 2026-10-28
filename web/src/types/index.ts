export type TestStatus = 'PASS' | 'FAIL' | 'NOT RUN' | 'BLOCKED';

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  description: string;
  status: 'pass' | 'notrun' | 'info';
  badgeText: string;
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  category: 'runtime' | 'infrastructure' | 'config' | 'orchestration' | 'observability' | 'ci';
  tool: string;
  description: string;
  resources: string[];
  ownership: string;
  network?: string;
  ports?: string;
}

export interface ResourceOwnershipRow {
  subsystem: string;
  tool: string;
  managedResources: string[];
  boundaryScope: string;
  nonInterferenceRule: string;
}

export interface PipelineStage {
  id: string;
  number: number;
  name: string;
  category: 'ci' | 'local';
  tool: string;
  purpose: string;
  validation: string;
  evidencePath: string;
  status: 'PASS' | 'NOT RUN';
}

export interface MonitoringCheck {
  id: string;
  name: string;
  type: 'HTTP' | 'TCP' | 'SYSTEM';
  endpoint: string;
  frequency: string;
  expectedState: string;
  lastVerifiedStatus: 'OK' | 'CRITICAL' | 'RECOVERED';
  description: string;
}

export interface SecurityControl {
  id: string;
  title: string;
  directive: string;
  status: 'IMPLEMENTED' | 'VERIFIED' | 'DISCLOSED_LIMITATION';
  summary: string;
  verificationEvidence: string;
  iconName: string;
}

export interface MilestoneItem {
  id: string;
  number: string;
  title: string;
  category: string;
  outcome: string;
  tools: string[];
  deliverables: string[];
  evidencePath: string;
  status: 'PASS';
}

export interface VerificationTestItem {
  id: string;
  category: 'Application' | 'Infrastructure' | 'Configuration' | 'Observability' | 'CI / Workflow' | 'Security';
  name: string;
  command: string;
  target: string;
  status: TestStatus;
  evidenceRef: string;
  notes: string;
}

export interface DocResource {
  id: string;
  title: string;
  category: string;
  description: string;
  relativePath: string;
  publicUrl: string;
  format: string;
  sizeOrSections: string;
}

export interface DemoCommand {
  id: string;
  label: string;
  category: string;
  description: string;
  command: string;
  safeToRunLocally: boolean;
  expectedOutputPreview: string;
}
