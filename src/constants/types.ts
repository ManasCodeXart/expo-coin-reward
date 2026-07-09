import type { SkPathBuilder } from '@shopify/react-native-skia'
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'

// ─── Coin ───────────────────────────────────────────────────────────────

export type CoinFace = 'heads' | 'tails'

export interface CoinProps {
    
    readonly face: CoinFace
    readonly source?: ImageSourcePropType
    readonly style?: StyleProp<ViewStyle>
}



export interface CoinFlipProps {
    readonly onResult?: (face: CoinFace) => void
}



export interface ScratchCardProps {
    readonly face: CoinFace | null
    readonly visible: boolean
    readonly onDismiss?: () => void
    readonly onFullyRevealed?: () => void
}

export interface ScratchPoint {
    readonly x: number
    readonly y: number
}


export interface ScratchStroke {
    readonly builder: SkPathBuilder
    lastPoint: ScratchPoint | null
}



export interface RevealContentProps {
    readonly face: CoinFace
}



export interface FlipRevealProps {
    readonly onFlipComplete?: (face: CoinFace) => void
    readonly onRevealComplete?: (face: CoinFace) => void
}