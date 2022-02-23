<!-- Footer -->
<!--
	Color Palette:
		https://color.adobe.com/create/color-wheel/?base=2&rule=Triad&selected=4&name=My%20Color%20Theme&mode=rgb&rgbvalues=0.9372549019607843,0.9372549019607843,0.9372549019607843,1,0.9986559139784958,0.9,1,1,1,0.7200000000000001,0.7691228070175566,0.8,0.63,0.672982456140362,0.7&swatchOrder=0,1,2,3,4
-->
<footer>
	<div class="container-fluid">
		<div id="gwt-standard-footer" class="row"></div>
		<div class="row" style="background-color: #A1ACB2;padding: 15px 0 12px 0;font-size: 0.9em;vertical-align: center;">
			<div class="col-lg-2 col-md-2"></div>
			<div class="col-lg-3 col-md-3">| All Rights Reserved. Copyright &copy; <?Php  echo date("Y"); ?></div>
			<div class="col-lg-4 col-md-4"></div>		
			<div class="col-lg-1 col-md-1">
				<span style="align-content: inline;">
					<a href="https://facebook.com/DENR.CORVA.CoastalAndReefTraining2017"><img src='images/icons/facebook.png' style="width: 20%;margin-right:3px;"></a>
					<a href="https://www.flickr.com/gp/136355008@N02/q331A6"><img src='images/icons/flickr-logo.png' style="width: 20%;"></a>
				</span>
			</div>	
			<div class="col-lg-2 col-md-2"></div>		
		</div>

		<!-- External JS file for the Government footer -->
		<script type="text/javascript">
			(function(d, s, id) {
			var js, gjs = d.getElementById('gwt-standard-footer');

			js = d.createElement(s); js.id = id;
			js.src = "//gwhs.i.gov.ph/gwt-footer/footer.js";
			gjs.parentNode.insertBefore(js, gjs);
			}(document, 'script', 'gwt-footer-jsdk'));
			</script>
	</div>
</footer> <!--  End footer -->