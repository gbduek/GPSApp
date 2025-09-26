import * as React from "react";
import Svg, {
	Path,
	Stop,
	RadialGradient,
	LinearGradient,
	Defs,
} from "react-native-svg";

const SamsungH = ({ width = 80, height = 80, ...props }) => (
	<Svg width={width} height={height} viewBox="0 0 64 64" {...props}>
		<Defs>
			<RadialGradient
				id="a"
				cx="33.211"
				cy="1965.619"
				r="42.955"
				gradientTransform="translate(0 -1934)"
				gradientUnits="userSpaceOnUse"
			>
				<Stop offset="0" stopColor="#f4e9c3" />
				<Stop offset="0.219" stopColor="#f8eecd" />
				<Stop offset="0.644" stopColor="#fdf4dc" />
				<Stop offset="1" stopColor="#fff6e1" />
			</RadialGradient>

			<LinearGradient
				id="b"
				x1="12.391"
				x2="49.643"
				y1="51.609"
				y2="14.357"
				gradientUnits="userSpaceOnUse"
			>
				<Stop offset="0" stopColor="#1fafff" />
				<Stop offset="0.989" stopColor="#01d994" />
			</LinearGradient>
		</Defs>

		<Path
			fill="url(#b)"
			d="M18 8h28c5.523 0 10 4.477 10 10v28c0 5.523-4.477 10-10 10H18c-5.523 0-10-4.477-10-10V18c0-5.523 4.477-10 10-10"
		/>

		<Path
			fill="#fff"
			d="M32.5 50c-2 0-4.5-.25-6.5-1.5s-7.25-5.25-8-5.75-2.25-2 0-4.25 7.25-7.75 8-8.5 2-1.5 4.25-1c.25-1 .25-3.5-1-5-1.5 1-3.75 5.5-6.25 5.5-2 0-3.25-1.25-3.75-2 .75.25 1.5 0 2.75-1.5s2.75-2.75 6.75-2.5C28 22 28 21 28 20s1.25-5 5.5-5c3.75 0 5.5 3 5.5 4v3c0 .25.5.25.5.75S39.5 25 39 26c-.25.5-.75.75-1.25.75H36.5L35.75 31S39 33.25 39 36v8l5-3.75c-.25-.5-1-2.25-.25-3.25s1.75-1.25 2.25-1.25 1 .5 1 1.25v3.25c0 .5 0 .75-.5 1.25S41 47.25 40 48s-3.75 2-7.5 2M27 45l-1.5-7.5-3.5 2.75z"
		/>
	</Svg>
);

export default SamsungH;
