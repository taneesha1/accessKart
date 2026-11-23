const depositStep = 500;

export function calculateRentalDeposit(productPrice: number): number {
  return Math.max(depositStep, Math.ceil(productPrice * 0.1 / depositStep) * depositStep);
}