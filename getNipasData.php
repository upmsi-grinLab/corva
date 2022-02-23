<?Php

/**
 *  A PHP file for fetching required data from the database
 *  All queries are written using SQL
 *  Every result is wriiten on external JSON files
 */ 

	/* 
	 *	SQL query for NIPAS information
	 *	Source table: nipas
	 *	Output: nipas-results.json
	 */
	require('inc/connect.php');

	$sql = "SELECT nipas.loc_id AS locID, municipality, nipas_name, area, filename, year_established, coral_area, mangrove_area, seagrass_area,lon, lat, region_id, province.province_id, province_name, connectivity.remarks as Con_Remarks FROM nipas INNER JOIN province ON nipas.province_id = province.province_id INNER JOIN connectivity ON nipas.loc_id = connectivity.loc_id ORDER BY nipas_name ASC";

	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('nipas-results.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);

	/* End NIPAS data */

	/* 
	 *	SQL query for FISH data
	 *	Source table: fish_sp, fish_den, fish_bio
	 *	Output: fish-sp.json, fish-den.json, fish-bio.json
	 */

	/* Fish count */
	require('inc/connect.php');

	// $sql = "SELECT fish_sp.id as id, fish_sp.loc_id as loc_id, fish_sp.survey_date as survey_date, fish_sp.benthicInvertivore as out_benthic, mpaTable.benthicInvertivore as mpa_benthic, fish_sp.corallivore as out_corallivore, mpaTable.corallivore as mpa_corallivore, fish_sp.detritivore as out_detritivore, mpaTable.detritivore as mpa_detritivore, fish_sp.herbivore as out_herbivore, mpaTable.herbivore as mpa_herbivore, fish_sp.omnivore as out_omnivore, mpaTable.omnivore as mpa_omnivore, fish_sp.piscivore as out_piscivore, mpaTable.piscivore as mpa_piscivore, fish_sp.planktivore as out_planktivore, mpaTable.planktivore as mpa_planktivore FROM fish_sp INNER JOIN ( SELECT * FROM fish_sp WHERE type = 'MPA' ) mpaTable WHERE fish_sp.type = 'OUT'";


	$sql = "SELECT fish_sp.id as id, fish_sp.loc_id as loc_id, fish_sp.survey_date as survey_date, fish_sp.benthicInvertivore as out_benthic, mpaTable.benthicInvertivore as mpa_benthic, fish_sp.corallivore as out_corallivore, mpaTable.corallivore as mpa_corallivore, fish_sp.detritivore as out_detritivore, mpaTable.detritivore as mpa_detritivore, fish_sp.herbivore as out_herbivore, mpaTable.herbivore as mpa_herbivore, fish_sp.omnivore as out_omnivore, mpaTable.omnivore as mpa_omnivore, fish_sp.piscivore as out_piscivore, mpaTable.piscivore as mpa_piscivore, fish_sp.planktivore as out_planktivore, mpaTable.planktivore as mpa_planktivore FROM fish_sp INNER JOIN (SELECT * FROM fish_sp WHERE type = 'MPA') mpaTable ON fish_sp.loc_id = mpaTable.loc_id AND fish_sp.survey_date = mpaTable.survey_date WHERE fish_sp.type = 'OUT'";

	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('fish-sp.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* End Fish count */

	/* Fish density */
	require('inc/connect.php');

	// $sql = "SELECT fish_den.id as id, fish_den.loc_id as loc_id, fish_den.survey_date as survey_date, fish_den.benthicInvertivore as out_benthic, mpaTable.benthicInvertivore as mpa_benthic, fish_den.corallivore as out_corallivore, mpaTable.corallivore as mpa_corallivore, fish_den.detritivore as out_detritivore, mpaTable.detritivore as mpa_detritivore, fish_den.herbivore as out_herbivore, mpaTable.herbivore as mpa_herbivore, fish_den.omnivore as out_omnivore, mpaTable.omnivore as mpa_omnivore, fish_den.piscivore as out_piscivore, mpaTable.piscivore as mpa_piscivore, fish_den.planktivore as out_planktivore, mpaTable.planktivore as mpa_planktivore FROM fish_den INNER JOIN ( SELECT * FROM fish_den WHERE type = 'MPA' ) mpaTable WHERE fish_den.type = 'OUT'";

	$sql = "SELECT fish_den.id as id, fish_den.loc_id as loc_id, fish_den.survey_date as survey_date, fish_den.benthicInvertivore as out_benthic, mpaTable.benthicInvertivore as mpa_benthic, fish_den.corallivore as out_corallivore, mpaTable.corallivore as mpa_corallivore, fish_den.detritivore as out_detritivore, mpaTable.detritivore as mpa_detritivore, fish_den.herbivore as out_herbivore, mpaTable.herbivore as mpa_herbivore, fish_den.omnivore as out_omnivore, mpaTable.omnivore as mpa_omnivore, fish_den.piscivore as out_piscivore, mpaTable.piscivore as mpa_piscivore, fish_den.planktivore as out_planktivore, mpaTable.planktivore as mpa_planktivore FROM fish_den INNER JOIN ( SELECT * FROM fish_den WHERE type = 'MPA' ) mpaTable ON fish_den.loc_id = mpaTable.loc_id AND fish_den.survey_date = mpaTable.survey_date WHERE fish_den.type = 'OUT'";

	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('fish-den.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* End fish density */

	/* Fish biomass */
	require('inc/connect.php');

	// $sql = "SELECT fish_bio.id as id, fish_bio.loc_id as loc_id, fish_bio.survey_date as survey_date, fish_bio.benthicInvertivore as out_benthic, mpaTable.benthicInvertivore as mpa_benthic, fish_bio.corallivore as out_corallivore, mpaTable.corallivore as mpa_corallivore, fish_bio.detritivore as out_detritivore, mpaTable.detritivore as mpa_detritivore, fish_bio.herbivore as out_herbivore, mpaTable.herbivore as mpa_herbivore, fish_bio.omnivore as out_omnivore, mpaTable.omnivore as mpa_omnivore, fish_bio.piscivore as out_piscivore, mpaTable.piscivore as mpa_piscivore, fish_bio.planktivore as out_planktivore, mpaTable.planktivore as mpa_planktivore FROM fish_bio INNER JOIN ( SELECT * FROM fish_bio WHERE type = 'MPA' ) mpaTable WHERE fish_bio.type = 'OUT'";

	$sql = "SELECT fish_bio.id as id, fish_bio.loc_id as loc_id, fish_bio.survey_date as survey_date, fish_bio.benthicInvertivore as out_benthic, mpaTable.benthicInvertivore as mpa_benthic, fish_bio.corallivore as out_corallivore, mpaTable.corallivore as mpa_corallivore, fish_bio.detritivore as out_detritivore, mpaTable.detritivore as mpa_detritivore, fish_bio.herbivore as out_herbivore, mpaTable.herbivore as mpa_herbivore, fish_bio.omnivore as out_omnivore, mpaTable.omnivore as mpa_omnivore, fish_bio.piscivore as out_piscivore, mpaTable.piscivore as mpa_piscivore, fish_bio.planktivore as out_planktivore, mpaTable.planktivore as mpa_planktivore FROM fish_bio INNER JOIN ( SELECT * FROM fish_bio WHERE type = 'MPA' ) mpaTable ON fish_bio.loc_id = mpaTable.loc_id AND fish_bio.survey_date = mpaTable.survey_date WHERE fish_bio.type = 'OUT'";

	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('fish-bio.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* End fish biomass */

	/* End FISH data */

	/* End FISH data */

	/* 
	 *	SQL query for SHALLOW REEF data
	 *	Source table: coral_shallow
	 *	Output: coral-results.json
	 */
	require('inc/connect.php');

	$sql = "SELECT * FROM coral_shallow";
	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('coral-results.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* End coral shallow */


	/* 
	 *	SQL query for COASTAL STABILITY data
	 *	Source table: coastal_stability
	 *	Output: coastal-results.json
	 */
	require('inc/connect.php');

	$sql = "SELECT * FROM coastal_stability";
	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('coastal-results.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* End coastal stability */


	/* 
	 *	SQL query for SEAGRASS DENSITY data
	 *	Source table: seagrass
	 */

	require('inc/connect.php');

	//$sql = "SELECT * FROM seagrass cover";
	$sql = "SELECT * FROM seagrass_cover order by survey_date asc";
	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('seagrassCover-results.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* Output: seagrassCover-results.json */

	require('inc/connect.php');

	$sql = "SELECT * FROM seagrass";
	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('seagrass-results.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* Output: seagrass-results.json */
	/* End seagrass data */


	/* 										!!! A T T E N T I O N !!!:
	*		Temporary disabled for now dahil di pa enabled ang admin upload for "Seagrass Species".
	 *		Currently getting the values from seagrass-results.json to display Seagrass Species Pie Chart
	 *
	 *	SQL query for SEAGRASS COVER data
	 *	Source table: seagrass_cover
	 *	Output: seagrass-cover.json
	 */
	/*require('inc/connect.php');

	$sql = "SELECT * FROM seagrass_cover";
	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('seagrass-cover.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);*/
	/* End seagrass cover data */

	/* 
	 *	SQL query for SEAGRASS COVER data
	 *	Source table: seagrass_cover
	 *	Output: seagrass-cover.json
	 */


	/* 
	 *	SQL query for ARRAS data
	 *	Source table: arras
	 *	Output: arras-results.json
	 */
	require('inc/connect.php');

	$sql = "SELECT * FROM arras";
	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('arras-results.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* End arras data */

	/* 
	 *	SQL query for DEEP REEF data
	 *	Source table: coral_deep
	 *	Output: deep-results.json
	 */
	require('inc/connect.php');

	$sql = "SELECT * FROM coral_deep";
	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('deep-results.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* End deep reef data */

	/* 
	 *	SQL query for MANGOVE data
	 *	Source table: mangrove_abundance, mangrove_basalarea, mangrove_stemdensity
	 *	Output: mangroveAbundance-results.json, mangroveBasalArea-results.json, mangroveStemDensity-results.json
	 */

	/* Mangrove Data */
	require('inc/connect.php');

	$sql = "SELECT loc_id, type, ANY_VALUE(survey_date) as survey_date, ANY_VALUE(N_fru) as N_fru, ANY_VALUE(B_sex) as B_sex, ANY_VALUE(R_muc) as R_muc, ANY_VALUE(L_lit) as L_lit, ANY_VALUE(X_gra) as X_gra, ANY_VALUE(C_dec) as C_dec, ANY_VALUE(A_mar) as A_mar, ANY_VALUE(A_rum) as A_rum, ANY_VALUE(R_api) as R_api, ANY_VALUE(S_alba) as S_alba, ANY_VALUE(R_sty) as R_sty, SUM(O_oct+P_aci+R+A_cor+X_mol+B_ter+A_flo+S_hyd+A_alb+L_rac+S_ova+B_gra+C_tan+E_aga) as Others FROM `mangrove_data` GROUP BY loc_id, type";
	$statement = $dbo->prepare($sql);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);

	$fp = fopen('mangrove-results.json','w+');
	fwrite($fp,json_encode($results));
	fclose($fp);
	/* End mangrove data */

?> <!-- /End PHP -->