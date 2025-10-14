import { Heart, Facebook, Instagram, Twitter, Phone, Mail, MapPin, AlertTriangle } from "lucide-react"

const Footer = () => {
  const quickActions = ["Report Stray Animal", "Find Nearby NGOs", "Volunteer Sign Up", "Emergency Contacts"]
  const resources = ["How to Help", "Animal Care Guide", "Success Stories", "Community Guidelines"]

  return (
    <footer className="footer">

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <span className="text-2xl font-bold">Paw Track</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting communities to save lives, one rescue at a time. Together, we're building a world where every
                animal has a chance.
              </p>
              <div className="flex space-x-4">
                <button className="btn btn-ghost btn-sm text-gray-300 hover:text-white hover:bg-white/10">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="btn btn-ghost btn-sm text-gray-300 hover:text-white hover:bg-white/10">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="btn btn-ghost btn-sm text-gray-300 hover:text-white hover:bg-white/10">
                  <Twitter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
              <ul className="space-y-3">
                {quickActions.map((action) => (
                  <li key={action}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                      {action}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource) => (
                  <li key={resource}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">+91 12345-PAWS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">help@pawtrack.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">Available in 50+ cities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Paw Track. All rights reserved. Made with ❤️ for animals everywhere.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer