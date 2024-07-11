<!DOCTYPE HTML>
<head>
	<meta lang="en">
	<meta charset="utf-8">
	<title>Concept Art</title>
	<link rel="stylesheet" href="../style.css">
</head>

<script src="./script.js"></script>

<body>
<div class="sidebar" id="main-sidebar">
<h1>Mateo Reggie</h1>
<h2>illustrator, concept artist</h2>
<h3>
mateo.s.reggie@gmail.com
</h3>
<ul class="navigation">
<li><a href="..">Home</a></li>
<li><a href="../illustrations">Illustrations</a></li>
<li><a href="">> Concept Art</a></li>
<li><a href="../painting">Other Art</a></li>

</ul>
</div>
<div class="content" id="main-content">
<div class="image-container">
	<?php

$dimensions = [
	[1, 0],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[0, 1],
];
	
$images = scandir(".", 1);
$descriptions = scandir(".", 1);

function filter_for_images($var){ 
return (str_ends_with($var, ".jpg") | str_ends_with($var, ".png"));}
function filter_for_text($var){ return(str_ends_with($var, ".txt"));}

$images = array_filter($images, "filter_for_images");
$images = array_values($images);

$descriptions = array_filter($descriptions, "filter_for_text");
$descriptions = array_values($descriptions);

$images = array_reverse($images);
$descriptions = array_reverse($descriptions);

$count = 0;

foreach ($images as $img){

$desc = fopen("./".$descriptions[$count], "r");
$txt = fread($desc, filesize("./".$descriptions[$count]));

$displaytype = "display-image-h";

if ($dimensions[$count][0] > $dimensions[$count][1]){
	$displaytype = "display-image-w";
}	

echo "<div>";
echo "<img class=\"{$displaytype}\" src=\"./{$img}\"></img>";
echo "<p class=\"description\">{$txt}</p>";
echo "</div>";

fclose($desc);
++$count;
}

?>
</div>
</div>
</body>
</html>