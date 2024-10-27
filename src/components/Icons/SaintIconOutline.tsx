type SaintIconOutlineProps = {
  size?: number;
  className?: string;
};

const SaintIconOutline = ({ size = 6, className }: SaintIconOutlineProps) => {
  return (
    <svg
      className={`h-${size} w-${size} stroke-3 ${className}`}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="300.000000pt"
      height="347.000000pt"
      viewBox="0 0 300.000000 347.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,347.000000) scale(0.050000,-0.050000)"
        stroke="none"
      >
        <path
          d="M2435 6558 c-1198 -156 -1771 -785 -1202 -1318 132 -123 373 -257
560 -312 l107 -31 0 -131 c0 -415 171 -991 395 -1329 175 -265 47 -628 -255
-727 -1126 -365 -1437 -642 -1518 -1353 -21 -184 -27 -255 -54 -680 l-13 -213
51 -33 c34 -23 158 -47 358 -72 1224 -150 2674 -158 3836 -19 714 86 731 96
700 392 -9 87 -27 275 -40 418 -75 861 -289 1095 -1356 1479 -279 101 -335
128 -393 192 -115 128 -143 427 -52 544 191 243 388 876 418 1341 l13 196 135
47 c1005 351 946 1158 -109 1480 -419 128 -1139 186 -1581 129z m1125 -336
c1004 -176 1276 -611 586 -935 -207 -97 -205 -98 -217 167 -8 177 -33 246
-122 329 -288 267 -1168 341 -1407 117 -35 -33 -86 -60 -113 -60 -194 0 -316
-177 -376 -545 -15 -89 -17 -89 -165 -24 -357 158 -494 344 -385 521 230 371
1321 585 2199 430z m-317 -470 c354 -68 446 -131 463 -319 13 -138 47 -224
127 -320 26 -31 41 -67 34 -80 -8 -13 -34 -54 -57 -93 -34 -53 -47 -115 -56
-260 -24 -370 -130 -730 -336 -1147 -171 -344 -166 -562 17 -822 40 -56 75
-87 88 -79 14 8 18 5 10 -8 -27 -42 122 -123 447 -245 1015 -377 1137 -527
1174 -1441 l12 -292 -51 -13 c-75 -19 -624 -87 -945 -117 -714 -67 -2483 -29
-3270 70 l-190 24 2 330 c6 910 129 1067 1122 1437 464 173 535 224 652 464
133 271 120 430 -65 787 -200 386 -274 646 -312 1092 -11 126 -27 189 -62 245
-57 90 -58 118 -9 163 20 18 52 85 71 148 77 260 66 245 272 352 302 157 525
189 862 124z"
        />
      </g>
    </svg>
  );
};

export default SaintIconOutline;