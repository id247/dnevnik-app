'use strict';

export default function (){
	
	(function (window, document, $){
	
		console.log('run');

		const isMobile = (function() { 
			if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
			){
				return true;
			}
			return false;
		})();

		function invision(){
			const $invision = $('#invision');

			if (isMobile){
				$invision.hide();
				return;
			}
			$invision.show();

			const $tabItems = $invision.find('.js-invision-tab');
			const $frame = $invision.find('.js-invision-frame');
			const $loader = $invision.find('.js-invision-loader');

			let os = 'ios';

			function loading(){
				$tabItems.attr('disabled', true);
				$frame.hide();	
				$loader.show();
			}

			function loaded(){
				$tabItems.attr('disabled', false);
				$frame.show();	
				$loader.hide();
			}

			function init(){
				loading();	
				const url = $tabItems.filter(':checked').val();
				$frame.attr('src', url);
			};

			init();	

			$tabItems.on('change', function(){
				const $this = $(this);
				const url = $this.val();
				os = $this.data('os');
							
				loading();			

				$frame.attr('src', url);				
			});

			$frame.on('load', function(){
				
				$frame.attr('data-os', os);

				loaded();			
			});
		}

		function slider(){
			const $gallery = $('#gallery');
			const $galleryLists = $gallery.find('.js-gallery-list');
			const $galleryBoxes = $gallery.find('.js-gallery-box');
			const $galleryBoxItems = $gallery.find('.js-gallery-box');
			const $galleryImages = $gallery.find('.js-gallery-image');
			const $tabItems = $gallery.find('.js-gallery-tab');
			const $loader = $gallery.find('.js-gallery-loader');

			let isLoaded = false;
			let loadedImagesCounter = 0;
			let sliderId = false;

			if (!isMobile){
				$gallery.hide();
				return;
			}

			$gallery.show();

			function loading(){
				$galleryBoxes.css('height', '300px');
				$tabItems.attr('disabled', true);
				$galleryLists.css('visibility', 'hidden');	
				$loader.show();
			}

			function loaded(){
				$galleryBoxes.css('height', '');
				$tabItems.attr('disabled', false);
				$galleryLists.css('visibility', 'visible');	
				$loader.hide();
			}

			function init(){

				let loadedSliderCount = 0;

				loading();

				$galleryLists.each(function(){

					$(this).bxSlider({
						pager: false,
						infiniteLoop: false,
						adaptiveHeight: true,
						onSliderLoad: () => {
							loadedSliderCount++;

							if (loadedSliderCount === $galleryLists.length){
								$galleryBoxItems.not(':first').hide();
								loaded();
							}
						},
					});

				});

			}

			init();

			$tabItems.on('change', function(){
				const $this = $(this);
				const os = $this.val();

				$galleryBoxItems
				.hide()
				.filter('[data-os="' + os + '"]')
				.show();

				console.log($galleryBoxItems.filter('[data-os="' + os + '"]'));
							
				// $galleryImages.each(function(){
				// 	const $this = $(this);
				// 	const oldSrc = $this.attr('src');
				// 	const newSrc = oldSrc.replace(/(android|ios)/, os);
				// 	$this.attr('src', newSrc);
				// });			
			});
		}

		function init(){

			invision();
			slider();
			
		}

		init(); 

	})(window, document, jQuery, undefined);

};
