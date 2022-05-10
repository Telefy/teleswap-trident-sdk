import { BigNumber } from '@ethersproject/bignumber'
import { Token } from '@telefy/teleswap-core-sdk'
import { Pair } from '@mazelon/teleswap-sdk'
import { MultiRoute, RToken, findMultiRouteExactIn as TinesFindMultiRouteExactIn } from '@telefy/teleswap-tines-sdk'
import { Pool } from '../entities/Pool'
import { convertPoolOrPairtoRPool } from './convertPoolOrPairtoRPool'

export function findMultiRouteExactIn(
  from: Token,
  to: Token,
  amountIn: BigNumber | number,
  pools: (Pool | Pair)[],
  baseToken: Token,
  gasPrice: number
): MultiRoute {
  return TinesFindMultiRouteExactIn(
    from as RToken,
    to as RToken,
    amountIn,
    pools.map(convertPoolOrPairtoRPool),
    baseToken as RToken,
    gasPrice
  )
}
