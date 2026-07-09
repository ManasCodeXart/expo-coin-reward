import FlipReveal from '../components/FlipReveal'

export default function Screen() {
  return (
    <FlipReveal
      onFlipComplete={(face) => console.log('flip complete', face)}
      onRevealComplete={(face) => console.log('reward revealed', face)}
    />
  )
}