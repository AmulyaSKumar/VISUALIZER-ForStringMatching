const NO_OF_CHARS = 256;

export function getNextState(pat, M, state, x) {
  if (state < M && x === pat[state].charCodeAt(0)) return state + 1;

  let ns, i;

  for (ns = state; ns > 0; ns--) {
    if (pat[ns - 1].charCodeAt(0) === x) {
      for (i = 0; i < ns - 1; i++) if (pat[i] !== pat[state - ns + 1 + i]) break;
      if (i === ns - 1) return ns;
    }
  }

  return 0;
}

export function computeTF(pat, M, TF) {
  let state, x;
  for (state = 0; state <= M; ++state)
    for (x = 0; x < NO_OF_CHARS; ++x)
      TF[state][x] = getNextState(pat, M, state, x);
}

export function search(pat, txt) {
  const M = pat.length;
  const N = txt.length;

  const TF = Array.from({ length: M + 1 }, () =>
    Array.from({ length: NO_OF_CHARS }, () => 0)
  );

  computeTF(pat, M, TF);

  const results = [];
  let state = 0;
  for (let i = 0; i < N; i++) {
    state = TF[state][txt[i].charCodeAt(0)];
    if (state === M) {
      results.push(i - M + 1);
    }
  }

  return results;
}
