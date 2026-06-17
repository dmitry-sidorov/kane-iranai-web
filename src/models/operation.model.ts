export type RealOperation = {
  id: string;
  title: string;
  amount: number;
  plannedOperationId: string;
};

export type PlannedOperation = {
  id: string;
  title: string;
  amount: number;
  realOperations: RealOperation[];
};
