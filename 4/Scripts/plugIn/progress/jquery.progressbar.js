//*2012-12-17�Ķ�
//����ͼƬ�Ŀ�Ⱥ͸߶ȹ̶�Ϊ255��50
//������ͼƬ��Ⱥ͸߶ȹ̶�Ϊ170��5
//�ٷֱ����ֵ�λ��Ҳд����
//�Ժ�ɿ��ǽ���Щд����ֵ�ĳɶ�̬���õ�ֵ��


/*
 * jQuery Progress Bar plugin
 * Version 1.1.0 (06/20/2008)
 * @requires jQuery v1.2.1 or later
 *
 * Copyright (c) 2008 Gary Teo
 * http://t.wits.sg

 USAGE:
 $(".someclass").progressBar();
 $("#progressbar").progressBar();
 $("#progressbar").progressBar(45);							// percentage
 $("#progressbar").progressBar({showText: false });			// percentage with config
 $("#progressbar").progressBar(45, {showText: false });		// percentage with config
 */
(function ($) {
    $.extend({
        progressBar: new function () {
            this.defaults = {
                increment: 2,
                speed: 15,
                showText: true, 										// show text with percentage in next to the progressbar? - default : true
                width: 255, 										// Width of the progressbar - don't forget to adjust your image too!!!
                boxImage: '../../../plugIn/progress/images/progressBar.png', 					// boxImage : image around the progress bar
                barImage: {
                    0: '../../../plugIn/progress/images/progressBar_blue.png',
                    70: '../../../plugIn/progress/images/progressBar_blue.png'
                }, 											// Image to use in the progressbar. Can be a single image too: 'progress/images/progressbg_green.gif'
                height: 50											// Height of the progressbar - don't forget to adjust your image too!!!
            };


            /* public methods */
            this.construct = function (arg1, arg2) {
                var argpercentage = null;
                var argconfig = null;

                if (arg1 != null) {
                    if (!isNaN(arg1)) {
                        argpercentage = arg1;
                        if (arg2 != null) {
                            argconfig = arg2;
                        }
                    } else {
                        argconfig = arg1;
                    }
                }

                return this.each(function (child) {
                    var pb = this;
                    if (argpercentage != null && this.bar != null && this.config != null) {
                        this.config.tpercentage = argpercentage;
                        if (argconfig != null)
                            pb.config = $.extend(this.config, argconfig);
                    } else {
                        var $this = $(this);
                        var config = $.extend({}, $.progressBar.defaults, argconfig);
                        var percentage = argpercentage;
                        if (argpercentage == null)
                            var percentage = $this.html().replace("%", ""); // parsed percentage


                        $this.html("");

                        //����position
                        $this.css({ "position": "absolute", "left": "0px", "top": "0px" });

                        //                        var bar = document.createElement('img');

                        //����
                        var bar = document.createElement("div");
                        //������
                        var bar_progressImg = document.createElement("div");


                        //                        var text = document.createElement('span');


                        var text = document.createElement('div');

                        bar.id = this.id + "_percentImage";
                        text.id = this.id + "_percentText";
                        bar.title = percentage + "%";
                        //                        bar.alt = percentage + "%";
                        //                        bar.src = config.boxImage;
                        bar.width = config.width;
                        var $bar = $(bar);

                        var $bar_progressImg = $(bar_progressImg);

                        var $text = $(text);

                        this.bar = $bar;

                        this.bar_progressImg = $bar_progressImg;

                        this.ntext = $text;
                        this.config = config;
                        this.config.cpercentage = 0;
                        this.config.tpercentage = percentage;

                        $bar.css("width", "255px");
                        $bar.css("height", "50px");

                        //���Ϊ���Զ�λ���򲻻�ռλ�����㲻�����ò㣬���ò��������㣩
                        $bar.css({ "position": "absolute", "left": "0px", "top": "0px", "z-index": "10" });

                        $bar.css({ "background-repeat": "no-repeat" });


                        $bar.css("background-image", "url(" + config.boxImage + ")");
                        $bar.css("padding", "0");
                        $bar.css("margin", "0");


//                        $bar_progressImg.css("width", "170px");
                        $bar_progressImg.css("height", "50px");
                        //                        $bar_progressImg.css("z-index", 11);    //��������ʾ�ڱ���֮��
                        $bar_progressImg.css({ "position": "absolute", "left": "25px", "top": "0px", "z-index": "11" });
                        $bar_progressImg.css({ "background-repeat": "no-repeat" });

                        $bar_progressImg.css("background-image", "url(" + getBarImage(this.config.cpercentage, config) + ")");
                        $bar_progressImg.css("padding", "0");
                        $bar_progressImg.css("margin", "0");

                        $bar_progressImg.css("background-position", 'left center');


                        $text.css({ "position": "absolute", "left": "200px", "top": "15px", "z-index": "11" });


                        $this.append($bar);

                        $this.append($bar_progressImg);

                        $this.append($text);
                    }
                    //��ý�����ͼƬ
                    function getBarImage(percentage, config) {
                        var image = config.barImage;
                        //�ٷֱȴﵽ70ʱ���л�ͼƬ
                        if (typeof (config.barImage) == 'object') {
                            for (var i in config.barImage) {
                                if (percentage >= parseInt(i)) {
                                    image = config.barImage[i];
                                } else {
                                    break;
                                }
                            }
                        }
                        return image;
                    }

                    var t = setInterval(function () {
                        var config = pb.config;
                        var cpercentage = parseInt(config.cpercentage);
                        var tpercentage = parseInt(config.tpercentage);
                        var increment = parseInt(config.increment);


                        //                        var bar = pb.bar;
                        var bar = pb.bar_progressImg;


                        var text = pb.ntext;
                        //                        var pixels = config.width / 100; 		// Define how many pixels go into 1%

                        var pixels = 170 / 100;     //�˴�д����170px���������ܳ���Ϊ170��

                        bar.css("background-image", "url(" + getBarImage(cpercentage, config) + ")");
//                                                bar.css("background-position", 'left center');
                        bar.css("width", ((cpercentage * pixels)) + "px");

//                        console.log(((cpercentage * pixels)));

                        if (config.showText)
                            text.html(" " + Math.round(cpercentage) + "%");

                        if (cpercentage > tpercentage) {
                            if (cpercentage - increment < tpercentage) {
                                pb.config.cpercentage = 0 + tpercentage
                            } else {
                                pb.config.cpercentage -= increment;
                            }
                        }
                        else if (pb.config.cpercentage < pb.config.tpercentage) {
                            if (cpercentage + increment > tpercentage) {
                                pb.config.cpercentage = tpercentage
                            } else {
                                pb.config.cpercentage += increment;
                            }
                        }
                        else {
                            clearInterval(t);
                        }
                    }, pb.config.speed);
                });
            };
        }
    });

    $.fn.extend({
        progressBar: $.progressBar.construct
    });

})(jQuery);


//*ԭ���루δ�޸İ棩


///*
//* jQuery Progress Bar plugin
//* Version 1.1.0 (06/20/2008)
//* @requires jQuery v1.2.1 or later
//*
//* Copyright (c) 2008 Gary Teo
//* http://t.wits.sg

//USAGE:
//$(".someclass").progressBar();
//$("#progressbar").progressBar();
//$("#progressbar").progressBar(45);							// percentage
//$("#progressbar").progressBar({showText: false });			// percentage with config
//$("#progressbar").progressBar(45, {showText: false });		// percentage with config
//*/
//(function ($) {
//    $.extend({
//        progressBar: new function () {
//            this.defaults = {
//                increment: 2,
//                speed: 15,
//                showText: true, 										// show text with percentage in next to the progressbar? - default : true
//                width: 300, 										// Width of the progressbar - don't forget to adjust your image too!!!
//                boxImage: 'progress/images/progressBar.png', 					// boxImage : image around the progress bar
//                barImage: {
//                    0: 'progress/images/progressBar_blue.png',
//                    70: 'progress/images/progressBar_blue.png'
//                }, 											// Image to use in the progressbar. Can be a single image too: 'progress/images/progressbg_green.gif'
//                height: 40											// Height of the progressbar - don't forget to adjust your image too!!!
//            };

//            /* public methods */
//            this.construct = function (arg1, arg2) {
//                var argpercentage = null;
//                var argconfig = null;

//                if (arg1 != null) {
//                    if (!isNaN(arg1)) {
//                        argpercentage = arg1;
//                        if (arg2 != null) {
//                            argconfig = arg2;
//                        }
//                    } else {
//                        argconfig = arg1;
//                    }
//                }

//                return this.each(function (child) {
//                    var pb = this;
//                    if (argpercentage != null && this.bar != null && this.config != null) {
//                        this.config.tpercentage = argpercentage;
//                        if (argconfig != null)
//                            pb.config = $.extend(this.config, argconfig);
//                    } else {
//                        var $this = $(this);
//                        var config = $.extend({}, $.progressBar.defaults, argconfig);
//                        var percentage = argpercentage;
//                        if (argpercentage == null)
//                            var percentage = $this.html().replace("%", ""); // parsed percentage


//                        $this.html("");
//                        var bar = document.createElement('img');
//                        var text = document.createElement('span');
//                        bar.id = this.id + "_percentImage";
//                        text.id = this.id + "_percentText";
//                        bar.title = percentage + "%";
//                        bar.alt = percentage + "%";
//                        bar.src = config.boxImage;
//                        bar.width = config.width;
//                        var $bar = $(bar);
//                        var $text = $(text);

//                        this.bar = $bar;
//                        this.ntext = $text;
//                        this.config = config;
//                        this.config.cpercentage = 0;
//                        this.config.tpercentage = percentage;

//                        $bar.css("width", config.width + "px");
//                        $bar.css("height", config.height + "px");
//                        $bar.css("background-image", "url(" + getBarImage(this.config.cpercentage, config) + ")");
//                        $bar.css("padding", "0");
//                        $bar.css("margin", "0");
//                        $this.append($bar);
//                        $this.append($text);
//                    }
//                    //��ý�����ͼƬ
//                    function getBarImage(percentage, config) {
//                        var image = config.barImage;
//                        //�ٷֱȴﵽ70ʱ���л�ͼƬ
//                        if (typeof (config.barImage) == 'object') {
//                            for (var i in config.barImage) {
//                                if (percentage >= parseInt(i)) {
//                                    image = config.barImage[i];
//                                } else { break; }
//                            }
//                        }
//                        return image;
//                    }

//                    var t = setInterval(function () {
//                        var config = pb.config;
//                        var cpercentage = parseInt(config.cpercentage);
//                        var tpercentage = parseInt(config.tpercentage);
//                        var increment = parseInt(config.increment);
//                        var bar = pb.bar;
//                        var text = pb.ntext;
//                        var pixels = config.width / 100; 		// Define how many pixels go into 1%

//                        bar.css("background-image", "url(" + getBarImage(cpercentage, config) + ")");
//                        bar.css("background-position", (((config.width * -1)) + (cpercentage * pixels)) + 'px 50%');

//                        if (config.showText)
//                            text.html(" " + Math.round(cpercentage) + "%");

//                        if (cpercentage > tpercentage) {
//                            if (cpercentage - increment < tpercentage) {
//                                pb.config.cpercentage = 0 + tpercentage
//                            } else {
//                                pb.config.cpercentage -= increment;
//                            }
//                        }
//                        else if (pb.config.cpercentage < pb.config.tpercentage) {
//                            if (cpercentage + increment > tpercentage) {
//                                pb.config.cpercentage = tpercentage
//                            } else {
//                                pb.config.cpercentage += increment;
//                            }
//                        }
//                        else {
//                            clearInterval(t);
//                        }
//                    }, pb.config.speed);
//                });
//            };
//        }
//    });

//    $.fn.extend({
//        progressBar: $.progressBar.construct
//    });

//})(jQuery);
