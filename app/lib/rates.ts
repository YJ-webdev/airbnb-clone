export const GUEST_SERVICE_FEE = 0.1412;

export const HOST_SERVICE_FEE = (value: number) => {
  switch (true) {
    case value > 0 && value < 50:
      return 1;
    case value > 50 && value < 83:
      return 2;
    case value > 83 && value < 116:
      return 3;
    default:
      return value * 0.03;
  }
};
