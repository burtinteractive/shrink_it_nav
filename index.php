<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>	
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset=”utf-8”>
	<title>shrink it test foundation example</title>
	
	<link rel="stylesheet" type="text/css" href="styles.css"/>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="jquery.shrink_it_nav.js"></script>
	

<script type="text/javascript">

	//should give option to auto generate container or name their own
	$(document).ready(function(){
		
		$(window).shrink_it_nav({
			
       			/****************configuration******************/
       			level:		    'all',
       			parent:         'nav ul',
       			break_points:   '350',
       			per_row:		'0,0,0,0',
       			stretch:		'0,0,0,0,0,0,0,0',
       			text:			'100',
       			max_size:		'50',
       			min_size:		'12',
       			menu_text:		"Test Menu"
       	});
       	$(window).resize(function(){
       	
       		$('#nav').shrink_it_nav({
       			/****************configuration******************/
       			level:			'all',
       			parent: 		'nav ul',
       			break_points:   '350',
       			per_row:		'0,0,0,0',
       			stretch:		'0,0,0,0,0,0,0,0',
       			text:			'100',
       			max_size:		'50',
       			min_size:		'12',
       			menu_text:		"Test Menu"
       		});
       	
       	})
       	
       		
    });
       		
</script>
</head>
<body>

	<nav id="nav">
		<ul id="ul1">
		<?	$count = 0;
			while($count< 4){
				echo "<li id='li$count'><a href='#' id='a$count'>test$count</a></li>";
				$count++;
			
			}?>
		</ul>
		<ul id="ul1">
		<?	$count = 0;
			while($count< 4){
				echo "<li><a href='#'>test$count</a></li>";
				$count++;
			
			}?>
		</ul>
		
	</nav>

	
	
</body>

</html>