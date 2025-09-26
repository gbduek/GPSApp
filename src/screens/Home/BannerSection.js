import React from "react";
import { View, Text } from "react-native";
import Banner from "../../../Components/Banner";
import styles from "./styles";

const BannerSection = ({ userCompany }) => {
	const cedaeIds = [
		"74ec66e6-87a4-3e6c-9ab2-55b3d91772a7",
		"f7eef769-4739-fa45-834a-a2827c24d234",
		"de12a610-8e5e-525e-3661-d19a33168e29",
		"650b0e12-4361-6eee-9588-e8bbcacab0cef",
	];

	const bannerImages = cedaeIds.includes(userCompany)
		? [
				require("../../../assets/Banners/cedae/banner_cedae.png"),
				require("../../../assets/Banners/cedae/banner_cedae_equilibrio.png"),
		  ]
		: [
				require("../../../assets/Banners/generic/banner_generic.png"),
				require("../../../assets/Banners/generic/banner_generic2.png"),
				require("../../../assets/Banners/generic/banner_generic3.png"),
		  ];

	return (
		<View style={{ marginTop: 10 }}>
			<View style={{ paddingHorizontal: 15 }}>
				<Banner images={bannerImages} />
			</View>
			<Text style={styles.heading}>
				Como está sua saúde e qualidade de vida?
			</Text>
			<Text style={styles.paragraph}>
				Veja os percentuais de preenchimento da sua GPS MED!
			</Text>
		</View>
	);
};

export default BannerSection;
