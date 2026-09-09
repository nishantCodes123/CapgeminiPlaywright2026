export function solveSecurityQuestion(question: string): number {
  const numbers: Record<string, number> = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
    seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
  };
  const expression = question.toLowerCase().replace(/-/g, ' ').replace(/\b(times|multiplied by)\b/g, '*').replace(/\b(plus|added to)\b/g, '+').replace(/\b(minus|less)\b/g, '-').replace(/\b(divided by)\b/g, '/');
  const tokens = expression.split(/\s+/).map((token) => String(numbers[token] ?? token));
  if (tokens.length !== 3 || !/^[+\-*/]$/.test(tokens[1])) {
    throw new Error(`Unsupported Signup security question: ${question}`);
  }
  return Function(`"use strict"; return (${tokens.join(' ')})`)();
}
