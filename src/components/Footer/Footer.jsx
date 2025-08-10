import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-links'>
        <div>
          <h2>Pages</h2>
          
          <li><Link>Feature</Link></li>
          <li><Link>Pricing</Link></li>
          <li><Link>Blog</Link></li>
          <li><Link>About</Link></li>
          <li><Link>Sign Up</Link></li>
        
        </div>
        <div>
          <h2>Resource</h2>
          
          <li><Link>Crypto News</Link></li>
          <li><Link>Bitcoin Treasury</Link></li>
          <li><Link>Crypto Heatmap</Link></li>
          <li><Link>Crypto APIs</Link></li>
          <li><Link>Documentation</Link></li>
        
        </div>
        <div>
          <h2>Support</h2>
          
            <li><Link>Request Form</Link></li>
            <li><Link>Advertising</Link></li>
            <li><Link>Help Center</Link></li>
            <li><Link>Bug Bounty</Link></li>
            <li><Link>FAQ</Link></li>
          
        </div>
        <div>
          <h2>CP Tracker</h2>
          <li><Link>Contact Us</Link></li>
          <li><Link>Branding Guide</Link></li>
          <li><Link>Terms of Service</Link></li>
          <li><Link>Privacy & Policy</Link></li>
          <li><Link>Cookie Preferences</Link></li>
        </div>
        <div>
          <h2>Community</h2>
          <li><Link>Github</Link></li>
          <li><Link>Linkedin</Link></li>
          <li><Link>Twitter</Link></li>
          <li><Link>Instagram</Link></li>
          <li><Link>Youtube</Link></li>
        </div>
      </div>
      <p className=''>All Copyright &copy; Reserved by CP Tracker - 2025.</p>
    </div>
  )
}

export default Footer
