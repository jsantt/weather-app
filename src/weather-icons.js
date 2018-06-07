import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML =
`<iron-iconset-svg name="weather-icons" size="100">
  <svg>
    <defs>

      <g id="close">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
      </g>

      <g id="windIcon">
          
              <circle cx="50" cy="50" r="30" stroke-width="3" fill="#67a9cf" stroke="#67a9cf"></circle>
              <polygon fill="#67a9cf" stroke="#67a9cf" points="50 3, 29 27, 71 27"></polygon>
      </g>

      <g id="iosShare">
          <polyline class="arrow" stroke-width="3" stroke="#fff" points="40,12 50,2 60,12" fill="none"></polyline>
          <line class="arrow-line" stroke-width="3" stroke="#fff" x1="50" y1="2" x2="50" y2="45"></line>
          <polyline class="rectangle" stroke-width="3" stroke="#fff" points="45,20 27,20 27,70 73,70 73,20 55,20" fill="none"></polyline> 
      </g>
    </defs>
  </svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);
