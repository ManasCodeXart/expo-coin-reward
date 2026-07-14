# expo-coin-reward

A gesture-driven coin-flip reward reveal — drag-to-spin coin toss, then a Skia-powered scratch card to reveal the prize — built for fintech and rewards apps.

<img width="1280" height="720" alt="km_20260710-2_1080p_30f_20260710_025559-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/c6cd9a47-44bf-4968-8e36-ad73849987c2" />

---

## ✨ Features

- 🪙 **Drag-to-spin coin toss** — velocity and translation both feed into whether a flip triggers, and how hard it spins; a light tap or slow drag just settles back instead of launching a flip
- 🎴 **Skia-powered scratch reveal** — GPU-rendered erase-as-you-scratch overlay over a real `<Canvas>`, with grid-based coverage tracking that auto-completes the reveal once enough of the card is scratched clear
- 🔗 **Two-moment callback API** — `onFlipComplete` fires the instant the coin lands, `onRevealComplete` fires once the reward is actually scratched clear — wire analytics and reward-unlock logic to each separately
- ⏱️ **Self-syncing dismiss timing** — the card's dismiss delay is derived from `ScratchCard`'s real exit-animation duration rather than a hand-copied number, so the two can never drift out of sync
- 🧠 **TypeScript-first** — fully typed props, no `any`
- 🎨 **Fork-and-edit reward content** — `RevealContent` ships as a clearly-marked placeholder; swap in your own cashback / coupon / prize UI directly rather than fighting a config API

---

## ⚙️ Installation

This isn't published as an npm package yet — copy the source directly into your project.

```bash
git clone https://github.com/ManasCodeXart/expo-coin-reward
```

Copy `components/` and `constants/` from `src/` into your project, then install the peer dependencies:

```bash
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler @shopify/react-native-skia lottie-react-native
```

> Reanimated 4.x ships its worklets runtime as the separate `react-native-worklets` package — it's required alongside `react-native-reanimated`, not optional.

> Requires `react-native-reanimated`'s Babel plugin already configured, and `GestureHandlerRootView` wrapping your app root — both are standard for any Expo Router / RN project already using Reanimated or Gesture Handler.

---

## 🚀 Usage

```tsx
import FlipReveal from './components/FlipReveal';

export default function Screen() {
  return (
    <FlipReveal
      onFlipComplete={(face) => {
        // e.g. fire an analytics event the instant the coin lands
      }}
      onRevealComplete={(face) => {
        // e.g. unlock the reward server-side once it's confirmed revealed
      }}
    />
  );
}
```

`CoinFlip` and `ScratchCard` are also exported individually if you want to compose your own flow — see the API tables below.

---

## Preview

https://github.com/user-attachments/assets/5f7964e2-59fa-4e81-a088-4958fa734511

---

## 🧱 Component Anatomy

```
<FlipReveal>
  ├─ CoinFlip         (drag-to-spin coin toss)
  ├─ ScratchCard       (Skia scratch-to-reveal overlay)
  │   └─ RevealContent (reward content underneath the scratch layer)
  └─ Coin              (per-face coin artwork, used inside CoinFlip)
```

---

## 🧩 API

### `<FlipReveal>`

The batteries-included flow — coin toss into scratch card, wired together with correctly-derived timing.

| Prop | Type | Default | Description |
|---|---|---|---|
| `onFlipComplete` | `(face: CoinFace) => void` | — | Called when the coin lands, before the scratch card appears. |
| `onRevealComplete` | `(face: CoinFace) => void` | — | Called once the scratch card is fully scratched and the reward is revealed. |

### `<CoinFlip>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `onResult` | `(face: CoinFace) => void` | — | Called when the coin finishes settling after a flip. |

### `<ScratchCard>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `face` | `CoinFace \| null` | — | Which face's reveal content to render underneath the scratch layer. |
| `visible` | `boolean` | — | Controls open/close. Animates in on `true`, slides out on `false`. |
| `onDismiss` | `() => void` | — | Called when the user taps outside the card to dismiss it. |
| `onFullyRevealed` | `() => void` | — | Called once the scratch coverage threshold is crossed and the overlay finishes fading out. |

### `<Coin>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `face` | `CoinFace` | — | Which face to render. |
| `source` | `ImageSourcePropType` | bundled artwork | Override the artwork for this face. Tails artwork should stay forward-facing — `CoinFlip` applies the 180° mirror via `rotateY`, so a pre-mirrored image renders backwards. |
| `style` | `StyleProp<ViewStyle>` | — | Style override for the coin container. |

### Types

```ts
type CoinFace = 'heads' | 'tails';
```

---

## 🎨 Customizing reward content

`RevealContent` renders whatever sits under the scratch layer, and is meant to be edited directly rather than configured through props — swap `HeadsReveal` / `TailsReveal` in `components/RevealContent.tsx` for your own cashback, coupon, or prize UI.

---



## 📄 License

MIT — see [LICENSE](./LICENSE).

---

## 🧱 Stack

[Expo SDK 56](https://expo.dev/changelog) · [React Native 0.85](https://reactnative.dev/) · [Reanimated 4.3](https://docs.swmansion.com/react-native-reanimated/) · [React Native Worklets 0.8](https://docs.swmansion.com/react-native-reanimated/) · [Gesture Handler 2.31](https://docs.swmansion.com/react-native-gesture-handler/) · [React Native Skia](https://shopify.github.io/react-native-skia/) · [Lottie React Native 7.3](https://github.com/lottie-react-native/lottie-react-native)
