import { I } from './icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <img src="/assets/freshcatch-logo.svg" alt="Freshcatch" style={{ height: 30, width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="foot-blurb" style={{ marginTop: 16 }}>Hand-selected seafood from sustainable fisheries — prepped, packed, and shipped overnight across the UAE.</p>
            <div className="foot-social">
              <a href="#" aria-label="Instagram"><I.Instagram size={16} /></a>
              <a href="#" aria-label="Facebook"><I.Facebook size={16} /></a>
              <a href="#" aria-label="X"><I.XLogo size={14} /></a>
              <a href="#" aria-label="WhatsApp"><I.WhatsApp size={16} /></a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Shop</h5>
            <ul>
              <li><a href="/shop">Today&apos;s catch</a></li>
              <li><a href="/shop">Sushi grade</a></li>
              <li><a href="/shop">Live seafood</a></li>
              <li><a href="/shop">Premium</a></li>
              <li><a href="#">Gift cards</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">Our story</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Help</h5>
            <ul>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2025 Tideline Seafood Co. All rights reserved.</span>
          <span>Made with care in Dubai, UAE.</span>
        </div>
      </div>
    </footer>
  );
}
