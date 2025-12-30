import Button from './UI/Button'
import logo from '../assets/logo.jpg'
export default function s() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>Foodies</h1>
      </div>
        <nav>
            <Button textOnly>Cart(0)</Button>
        </nav>

    </header>
  )
}
