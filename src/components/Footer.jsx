import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper ">
        <p className="footer-wrap">
          Created by{" "}
          <a className="name" href="#">
            Bhagyashree Walanj
          </a>
        </p>
        <p className="footer-desc">
          <FontAwesomeIcon icon={faGithub} />
          <span className="footer-span">
            <a
              href="https://github.com/bhagyashreeWalanj/language-translator"
              className="footer-label"
            >
              Github
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
