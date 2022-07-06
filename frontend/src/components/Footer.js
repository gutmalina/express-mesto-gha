import React from "react";

function Footer({date}){

  return(
    <footer className="footer indent__footer">
      <p className="footer__copyright">&copy;{date} Mesto Russia</p>
    </footer>
  )
}

export default Footer;
