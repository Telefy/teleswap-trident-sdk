import { difference } from '@telefy/teleswap-core-sdk'
import JSBI from 'jsbi'
import { A_PRECISION } from '../constants'

export function computeHybridLiquidity(reserve0: JSBI, reserve1: JSBI, a: JSBI): JSBI {
  if (JSBI.equal(reserve0, JSBI.BigInt(0)) && JSBI.equal(reserve1, JSBI.BigInt(0))) {
    return JSBI.BigInt(0)
  }

  const s = JSBI.add(reserve0, reserve1)

  const N_A = JSBI.multiply(a, JSBI.BigInt(2))

  let prevD

  let D = s

  for (let i = 0; i < 256; i++) {
    const dP = JSBI.divide(
      JSBI.divide(JSBI.multiply(JSBI.divide(JSBI.multiply(D, D), reserve0), D), reserve1),
      JSBI.BigInt(4)
    )

    prevD = D

    D = JSBI.divide(
      JSBI.multiply(JSBI.add(JSBI.divide(JSBI.multiply(N_A, s), A_PRECISION), JSBI.multiply(dP, JSBI.BigInt(2))), D),
      JSBI.add(
        JSBI.multiply(JSBI.subtract(JSBI.divide(N_A, A_PRECISION), JSBI.BigInt(1)), D),
        JSBI.multiply(dP, JSBI.BigInt(3))
      )
    )

    if (JSBI.lessThanOrEqual(difference(D, prevD), JSBI.BigInt(1))) {
      break
    }
  }

  return D
}
