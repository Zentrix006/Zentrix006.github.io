import { Component } from 'react'

export class WebGLErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('WebGL scene unavailable; using the 2D portfolio background.', error)
  }

  render() {
    if (this.state.failed) return <div className="webgl-fallback" aria-hidden="true" />
    return this.props.children
  }
}
