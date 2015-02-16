/*********************************************************************
*Copyright 2014 Adam Burt www.burtinteractive.com
*
*Permission is hereby granted, free of charge, to any person obtaining
*a copy of this software and associated documentation files (the
*"Software"), to deal in the Software without restriction, including
*without limitation the rights to use, copy, modify, merge, publish,
*distribute, sublicense, and/or sell copies of the Software, and to
*permit persons to whom the Software is furnished to do so, subject to
*the following conditions:
*
*The above copyright notice and this permission notice shall be
*included in all copies or substantial portions of the Software.
*
*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
*EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
*MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
*NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
*LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
*OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
*WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**********************************************************************/
/***********************************************************************
*Shrink_it_nav 
*provide a parent id then shrink text found inside
*add break points?
*use on images, videos and text
*get parent elements width then count child elements if only 1 == 100% else
*divide by the amount of children foundl
************************************************************************/
(function($){
	var $flag= true;
	var $final_percent_array= new Array();
	var $child_count=0;
	var $count_flag= true;
	var $submenu_count =0;
	var $child_subtract_count=0;
	//will create on fly and append class to this one
	var $submenu_object_array = new Array();
	var $submenu_object ={
		menu_id :"",
		level :0,
		parent :""
			
	}
	$.fn.shrink_it_nav= function(options){
		/**************variables****************
		* level =   under development. Trying to determine best way to implement
		* parent = how many records to return on scroll or load
		* break_points     = if in same div they are floated and shrunk to set next to each other.
		*					 if break point is set items will not float but maintain size at certain browser width
		* stretch	= set if stretches to parent width if smaller or retains own size1
		*
		*
		*
		****************************************/
		var settings =$.extend({
			
			level:  		null,
			parent: 		null,		
			break_points:   null,
			stretch:		null,
			max_size:		null,
       		min_size:		null,
			text:			null
		
		}, options);
		
		/********************************************************************
		*sets up all the variables that are used
		*
		*********************************************************************/
		var $object = settings.parent;
		var $level = settings.level;
		var $break_point_array = settings.break_points.split(",");
		var $object_array = $object.split(",");
		var $stretch_array = settings.stretch.split(",");
		var $width_array = new Array();
		var $height_array = new Array();
		var $number_children_array = new Array();
		var $height_count = 0;
		
		var $text_width_array = new Array();
		var $text_width_array = settings.text.split(",");
		var $width=0;
		//$temp_num=isParent2(5);
		//console.log($temp_num+ " this is temp num");
		
		if($count_flag){
			childCount();
		}
		parse();
		/********************************************************************
		*Parse
		*
		*
		*********************************************************************/
		function parse(){
			
			
			//since it has several children parse it like a tree structure.
			//use recursion to see if parent// get child 
			//will only have 1 leaf though.
			
			$count =0;
			
			$arr_count=0;
		
			while($arr_count < $object_array.length){	
			
			
					$('#'+$object_array[$arr_count]).children().each(function (i, v) {
    					
    					console.log(this + "  current parent object this is here "+ $object_array[$arr_count]);
    					console.log(i+" : "+ $(v).width() + " "+ $(v).html());
    					
    					if($(this).parent().width()< this.width){
    						$width=$(this).parent().width();
    					}else{
    						$width= this.width;
    					}
    					//count children of navigation so not to be in final count
    					//if($(v).html().indexOf("ul") >=0 ){
    					console.log("---------------------- "+$(v).attr("class")+" -------------------");
    					if($(v).parent().html().indexOf("ul") >=0 ){
    						console.log("it is here and true");
    					//if($(v).html().indexOf("sub_class") >=0 ){
    						
    						
    						//$(v).children().each(function(a,b){
    						
    							//console.log($(b).text() + " this is the child");
    							//$child_subtract_count++;
    						//});
    						
    					}else{
    					
    					
    						console.log($final_percent_array.length+ " ------ "+$arr_count + " ------ "+ $flag+ "---"+($child_count) );
    						$height_array[$height_count]=$width+":"+this.height;
    					
    					
    						if($flag){
    					
    						
    							if($final_percent_array.length==($child_count) && $arr_count ==0 && $flag){
    							
    								$flag=false;
    							}
    							$final_percent_array[$height_count]= this.height/$width;
							}
							$count++;
						
							$height_count++;
							//$height_count = $height_count -($child_subtract_count-1);
							//$child_subtract_count=0;
						}
						
					});
				console.log($child_subtract_count+ " here is the final subtract count");
				$number_children_array[$arr_count]= $count;
				console.log($("#"+$object_array[$arr_count]).width()+ " <-- object width --> "+$object_array[$arr_count] );
				
				if($break_point_array[$arr_count]>= $('#'+$object_array[$arr_count]).width() && $break_point_array[$arr_count] != 0){
					console.log("inside break point 2***********************************************************");
					if($stretch_array[$arr_count]==0){
						console.log("*******************this is it**************************");
						//$width_array[$arr_count]=this.width;
						$width_array[$arr_count]=$("#"+$object_array[$arr_count]).width();
					}else{
						$width_array[$arr_count]=$("#"+$object_array[$arr_count]).width();
					}
				}else{
					
					//$width_array[$arr_count]=$("#"+$object_array[$arr_count]).width()/$count;
					$width_array[$arr_count]=$("#"+$object_array[$arr_count]).width()/$number_children_array[$arr_count];
				}
				
				
				changeSize($arr_count);
				
				$arr_count++;
			}
		
			$height_count=0;
		}
		/********************************************************************
		*Change Size
		*
		*variables: takes in $the_count  returns:none modifies:each object on 
		*passed into the $object_array
		*********************************************************************/
		function changeSize($the_count){
					console.log("calling changeSize ------------------- "+ $number_children_array[$the_count] + "  "+ $height_count);
			
				//$height_count = $height_count -$child_subtract_count;
				// $number_children_array[$the_count] =  $number_children_array[$the_count] -$child_subtract_count;
								//	console.log("calling changeSize ------------------- "+ $number_children_array[$the_count] + "  "+ $height_count);

				$('#'+$object_array[$the_count]).children().each(function () {
    				
					$percent_count = $height_count -$number_children_array[$the_count];   
							
    				$percent = $final_percent_array[$percent_count];
    				
    			
    				//check if break point is set.
    				if($break_point_array[$the_count]>= $('#'+$object_array[$the_count]).width() && $break_point_array[$the_count] != 0){
    				
    					this.style.width=Math.floor($('#'+$object_array[$the_count]).width())+"px";
    					this.style.height=(Math.floor($('#'+$object_array[$the_count]).width())*$percent)+"px";
    					this.style.clear="both";
    				}else{
    					this.style.width=Math.floor($width_array[$arr_count])+"px";
    					this.style.height=(Math.floor($width_array[$arr_count])*$percent)+"px";
    					this.style.clear="none";
    				}
    				
    				
    				this.style.width=Math.floor($width_array[$arr_count])+"px";
    				this.style.height=(Math.floor($width_array[$arr_count])*$percent)+"px";
    			
    				
    				
    			
    				 
    				
    				this.style.cssFloat ="left";
    				$count++;
    				//have sizes now get text size
    				var x = $(this).offset();
    				//console.log($(this).text()+" <-------- "+ $(this).width()+ "   ---- "+ $(this).attr('id')+ " "+ x.left);
    				var text_w = $(this).text();
    				//console.log(text_w.length+ " <-------  length of string " + $(this).text().clientWidth);
    				//console.log($("#"+$(this).attr("id")+ " a").attr('id')+" width of text "+$("#"+$(this).attr("id")+ " a").width());
    				//console.log($(this+"a").width());
    				$(this).css("font-size",($(this).width()/(text_w.length)));
    				
    				$count2 = 12;
    				//console.log(this.scrollWidth+ " this is scrollwidth "+ this.offsetWidth + " "+ this.id);
    				
    				
    				//find link or text. see if it has an id. if no idea assign it one.
    				//console.log($(this).find("a").attr("id")+ " this is find value");
    				//var el =$(this).find("a").attr("id");
    				var id = $(this).find("a").attr("id");
    				console.log(id + " ------------------id "+ " " + $(this).html() );
    				var el = document.getElementById(id);
    				//append id to it if null
    				if(el == null){
    					console.log("el is null baby");
    					//not sure what I was doing here wasn't really assiging anything
    					$(this).find("a").attr("id","a2"+$count);
    					//assign id here
    					//$(this).attr("id","a2"+$count);
    					var el = document.getElementById("a2"+$count);
    				}
    				console.log($(this).width());
    				console.log(el.scrollWidth);
    				
    				if(el.scrollWidth< $(this).width()){
    					while(el.scrollWidth< ($(this).width()-10)){
    						//console.log($count2);
    						//$(this).css("font-size",$count2+"px");
    						el.style.fontSize = $count2+"px";
    						$count2++;
    					}
    				}else{
    					$count2=el.scrollWidth;
    					while(($(this).width()-10) < (el.scrollWidth) ){
    						//console.log($count2);
    						//$(this).css("font-size",$count2+"px");
    						el.style.fontSize = $count2+"px";
    						$count2--;
    					}
    				
    				}
    				$count2=0;
    				
				});
				
			
			$count =0;
			
			$width_array.length= 0;
			
		}
		/********************************************************************
		*Child Count
		*Counts all children elements from the id's passed in for elements
		*variables:none  only sets the variable $child_count
		*********************************************************************/
		function childCount(){
			var $temp_count=0
			console.log($object_array);
			while($temp_count < $object_array.length){
				$('#'+$object_array[$temp_count]).children().each(function (a, b) {
					//$child_count++;
					//append class here so we know it's a submenu
					//console.log(a +" : "+$(b).text());
					//console.log($(b).parent().parent().attr("id")+ " parent of a parent");
					//console.log($(b).parent().parent().parent().html()+ " parent of a parent");
					//console.log($(b).html());
				if($(b).html().indexOf("ul") >=0 ){
					$(b).children().each(function(c,d){
    						
    							//console.log($(b).text() + " this is the child");
    							//$child_subtract_count++;
    							$(d).parent().attr("class","sub_class");
    				});
    			}
					
				});
				$temp_count++;
			}
			//set count flag to false so we only count children elements once
			$count_flag=false;
		}
		
		//what is the base case? how do we even know
		///changing this to take in current element and count
		function childCount2($count_children, el){
			var $temp_count=0
			
			
				$('#'+$object_array[$temp_count]).children().each(function () {
					//$child_count++;
					//what does this return
					isParent(this);
					
				});
				$temp_count++;
			
			//set count flag to false so we only count children elements once
			$count_flag=false;
		}
		
		/********************************************************************
		*Child Count
		*Counts all children elements from the id's passed in for elements
		*variables:none  only sets the variable $child_count
		*********************************************************************/
		function isParent(el){
		
			
			//loops through array of possible div 
			//only  ul, li, could expand to more  
			//if($parent){
				//call childCount
				//childCount(){
				
				//}
			//}	
			
		
		}
		function isParent2(num){
		
			
			if(num > 100){
				return num;
			}
			//if($parent){
				//call childCount
				//childCount(){
				
				//}
			//}	
			return isParent2(num +10);
			
		}
		
	}  
 }(jQuery));