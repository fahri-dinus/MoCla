function populateDB(tx) {	
    //tx.executeSql('DROP TABLE IF EXISTS cl_cours');
    tx.executeSql('CREATE TABLE IF NOT EXISTS `cl_cours` ('+
        '`cours_id` int(11) NOT NULL,'+'`code` varchar(40),'+
        '`isSourceCourse` tinyint(4) NOT NULL,'+
        '`sourceCourseId` int(11),'+'`administrativeNumber` varchar(40),'+
        '`directory` varchar(20),'+'`dbName` varchar(40),'+
        '`language` varchar(15),'+'`intitule` varchar(250),'+
        '`titulaires` varchar(255),'+'`email` varchar(255),'+
        '`extLinkName` varchar(30),'+'`extLinkUrl` varchar(180),'+
        '`visibility` varchar(10),'+'`access` varchar(10),'+
        '`registration` varchar(10),'+'`registrationKey` varchar(255),'+
        '`diskQuota` int(10),'+'`versionDb` varchar(250),'+
        '`versionClaro` varchar(250),'+'`lastVisit` datetime,'+
        '`lastEdit` datetime,'+'`creationDate` datetime,'+
        '`expirationDate` datetime,'+'`defaultProfileId` int(11) NOT NULL,'+
        '`status` varchar(10),'+'`userLimit` int(11) NOT NULL,'+
        'PRIMARY KEY (`cours_id`))');
    //tx.executeSql('DROP TABLE IF EXISTS cl_user');
    tx.executeSql('CREATE TABLE IF NOT EXISTS `cl_user` ('+
        '`user_id` int(11),'+'`nom` varchar(60),'+'`prenom` varchar(60),'+
        '`username` varchar(20), `password` varchar(50),'+
        '`language` varchar(15), `authSource` varchar(50),'+
        '`email` varchar(255), `officialCode` varchar(255),'+
        '`officialEmail` varchar(255), `phoneNumber` varchar(30),'+
        '`pictureUri` varchar(250), `creatorId` int(11),'+
        '`isPlatformAdmin` tinyint(4), `isCourseCreator` tinyint(4),'+
        'PRIMARY KEY (`user_id`) )');
    //tx.executeSql('DROP TABLE IF EXISTS c_tp109_course_description');
    tx.executeSql('CREATE TABLE IF NOT EXISTS `c_tp109_course_description` ('+
        '`id` int(11), `category` int(11), `title` varchar(255),'+ 
        '`content` text, `lastEditDate` datetime, `visibility` varchar(10),'+
        'PRIMARY KEY (`id`) )');
    //tx.executeSql('DROP TABLE IF EXISTS c_TP109_announcement');
    tx.executeSql('CREATE TABLE IF NOT EXISTS `c_TP109_announcement` ('+
        '`id` mediumint(11) NOT NULL, `title` varchar(80), `contenu` text,'+
        '`visibleFrom` date,`visibleUntil` date, `temps` date, `ordre` mediumint(11),'+
        '`visibility` varchar(10), PRIMARY KEY (`id`) )');
    //tx.executeSql('DROP TABLE IF EXISTS c_TP109_wrk_assignment');
    tx.executeSql('CREATE TABLE IF NOT EXISTS `c_TP109_wrk_assignment` ('+
        '`id` int(11), `title` varchar(200), `description` text ,'+
        '`visibility` varchar(10), `def_submission_visibility` varchar(10),'+
        '`assignment_type` varchar(15), `authorized_content` varchar(10),'+
        '`allow_late_upload` varchar(10), `start_date` datetime,'+
        '`end_date` datetime, `prefill_text` text,'+
        '`prefill_doc_path` varchar(200), `prefill_submit` varchar(10),'+
        'PRIMARY KEY (`id`) )');
    //tx.executeSql('DROP TABLE IF EXISTS c_TP109_wrk_submission');
    tx.executeSql('CREATE TABLE IF NOT EXISTS `c_TP109_wrk_submission` ('+
        '`id` int(11),`assignment_id` int(11), `parent_id` int(11),'+
        '`user_id` int(11), `group_id` int(11), `title` varchar(200),'+
        '`visibility` varchar(10), `creation_date` datetime, '+
        '`last_edit_date` datetime, `authors` varchar(200), '+
        '`submitted_text` text, `submitted_doc_path` varchar(200), '+
        '`private_feedback` text, `original_id` int(11),'+
        '`score` smallint(3), PRIMARY KEY (`id`) )');         
}

errorCB = function(tx, err) {
    alert("Error pokoke lah: "+err);
}

function populateSuccess() {        
    db.transaction(queryDB, errorCB);
}

function queryDB(tx) {
    tx.executeSql('delete from `c_TP109_wrk_assignment` where 1');
    tx.executeSql('delete from `c_TP109_wrk_submission` where 1');
    tx.executeSql('delete from `c_TP109_announcement` where 1');
    tx.executeSql('delete from `cl_cours` where 1');
    tx.executeSql('delete from `cl_user` where 1');
    tx.executeSql('delete from `c_tp109_course_description` where 1');    
    
    tx.executeSql("INSERT INTO `c_TP109_wrk_assignment` (`id`, `title`, `description`, `visibility`, `def_submission_visibility`, `assignment_type`, `authorized_content`, `allow_late_upload`, `start_date`, `end_date`, `prefill_text`, `prefill_doc_path`, `prefill_submit`) VALUES (1,	'Childrens Literature',	'<p><span>Surveys the history of children’s literature, considers learning theory and developmental factors influencing reading interests, and uses bibliographic tools in selecting books and materials for recreational interests and educational needs of children. Lecture 3 hours per week.</span></p>\r\n<!-- content: html tiny_mce -->\r\n<p> </p>',	'VISIBLE',	'VISIBLE',	'INDIVIDUAL',	'TEXT',	'YES',	'2012-10-06 15:33:00',	'2013-10-06 15:33:00',	'',	'',	'ENDDATE')");
    tx.executeSql("INSERT INTO `c_TP109_wrk_submission` (`id`, `assignment_id`, `parent_id`, `user_id`, `group_id`, `title`, `visibility`, `creation_date`, `last_edit_date`, `authors`, `submitted_text`, `submitted_doc_path`, `private_feedback`, `original_id`, `score`) VALUES (1,	1,	NULL,	1,	NULL,	'Pekerjaan hampir terlambat',	'VISIBLE',	'2012-12-09 00:33:58',	'2012-12-09 00:33:58',	'Firdausillah Fahri',	'\r\n<p>ini pekerjaan yang hampir terlambat, tapi ya sudahlah yang penting berhasil mengerjakan kerjaan dengan sempurna</p>',	'',	'',	NULL,	NULL);");
    tx.executeSql("INSERT INTO `c_TP109_announcement` (`id`, `title`, `contenu`, `visibleFrom`, `visibleUntil`, `temps`, `ordre`, `visibility`) VALUES (1,	'Pergantian Hari untuk Kelas English',	'<!-- content: html tiny_mce -->\r\n<p>Dear mahasiswa,</p>\r\n<p>Karena tanggal 12 November 2012 akan diadakan upacara Hari Pahlawan, jadi kelas hari Senin, 12 November akan ditiadakan. Kelas akan diganti hari Rabu 14 November jam 13.00 di A3-201.</p>\r\n<p>Thanks',	NULL,	NULL,	'2012-11-16',	0,	'SHOW')");
    tx.executeSql("INSERT INTO `cl_cours`"+
        "(`cours_id`, `code`, `isSourceCourse`, `sourceCourseId`,"+
        " `administrativeNumber`, `directory`, `dbName`, `language`,"+
        " `intitule`, `titulaires`, `email`, `extLinkName`, `extLinkUrl`,"+
        " `visibility`, `access`, `registration`, `registrationKey`,"+
        " `diskQuota`, `versionDb`, `versionClaro`, `lastVisit`,"+
        " `lastEdit`, `creationDate`, `expirationDate`, `defaultProfileId`,"+
        " `status`, `userLimit`) VALUES "+
        "(1,	'TP109',	0,	NULL,	'TP109',	'TP109',	'c_TP109',"+
        "	'english',	'English Basic',	'Nissa Dwi',	'nissa.dwi@gmail.com',"+
        "	'',	'',	'visible',	'public',	'open',	'',	NULL,	'1.11.3',"+
        "	'1.11.3',	NULL,	'2012-11-16 12:19:25',	'2012-11-16 12:19:25',"+
        "	NULL,	3,	'enable',	0);");
    tx.executeSql("INSERT INTO `cl_user` "+
        "(`user_id`, `nom`, `prenom`, `username`, `password`, `language`,"+
        "`authSource`, `email`, `officialCode`, `officialEmail`, `phoneNumber`,"+
        " `pictureUri`, `creatorId`, `isPlatformAdmin`, `isCourseCreator`)"+
        " VALUES (2,	'Vivie',	'Kumenap',	'viviekumenap',	'kumenap',"+
        "	'',	'claroline',	'nissadwi@yahoo.com',	'',	'',	'',	NULL,	2,	0,	0);");
    tx.executeSql("INSERT INTO `c_tp109_course_description` VALUES (1,	0,	'Description',	'<!-- content: html tiny_mce -->\r\n<p>Mata kuliah ini mengajarkan kepada mahasiswa dasar-dasar bahasa Inggris untuk dapat diterapkan dalam percakapan sehari-hari pada umumnya dan diskusi akademis pada khususnya. Materi yang difokuskan dalam mata kuliah Bahasa Inggris meliputi tiga hal yaitu sesi <em>writing</em>, <em>reading</em> dan <em>speaking </em>disertai dengan penerapan grammar.</p>',	'2012-11-16 12:40:03',	'VISIBLE');");
    tx.executeSql("INSERT INTO `c_tp109_course_description` VALUES (2,	1,	'Qualifications and Goals',	'<!-- content: html tiny_mce -->\r\n<p>Tujuan pembelajaran bahasa Inggris adalah agar mahasiswa dapat menggunakan bahasa Inggris untuk menulis, membaca dan berbicara sesuai dengan grammar</p>',	'2012-11-16 12:43:11',	'VISIBLE');");
    tx.executeSql("INSERT INTO `c_tp109_course_description` VALUES (3,	2,	'Course content',	'<!-- content: html tiny_mce -->\r\n<p>Materi yang diajarkan dalam mata kuliah bahasa Inggris dibagi menjadi tiga sesi, yaitu :</p>\r\n<p>1. Writing, yang berisi teknik dasar menulis dalam bahasa Inggris</p>\r\n<p>2. Reading, materi yang diajarkan yaitu pemahaman artikel dalam bahasa Inggris</p>\r\n<p>3. Speaking, pendalaman grammar bahasa Inggris untuk diterapkan dalam percakapan sehari-hari.</p>\r\n<p>Fokus materi grammar yang disampaikan adalah :</p>\r\n<p>',	'2012-11-16 12:50:10',	'VISIBLE');");
    tx.executeSql("INSERT INTO `c_tp109_course_description` VALUES (4,	3,	'Teaching-training activities',	'<!-- content: html tiny_mce -->\r\n<p>Metode pembelajaran dalam mata kuliah ini dilakukan dengan diskusi dan praktek.',	'2012-11-16 12:55:22',	'VISIBLE');");
    tx.executeSql("INSERT INTO `c_tp109_course_description` VALUES (5,	4,	'Support',	'<!-- content: html tiny_mce -->\r\n<p>-</p>',	'2012-11-16 13:04:54',	'VISIBLE');");
    tx.executeSql("INSERT INTO `c_tp109_course_description` VALUES (6,	5,	'Human and Physical Resources',	'<!-- content: html tiny_mce -->\r\n<p>-</p>',	'2012-11-16 13:05:13',	'VISIBLE');");
    tx.executeSql("INSERT INTO `c_tp109_course_description` VALUES (7,	6,	'Methods of evaluation',	'<!-- content: html tiny_mce -->\r\n<p>Evaluasi pembelajaran pada mata kuliah ini dilakukan dengan latihan menulis, memahami isi bacaan dan presentasi dalam bahasa Inggris.',	'2012-11-16 13:12:37',	'VISIBLE');"); 
    
    tx.executeSql('SELECT nom, prenom FROM cl_user', [], dbSuccess, errorCB);
}

function dbSuccess(tx, results) {
    //var len = results.rows.length;    
    //$('#uname').val(results.rows.item(0).nom+" "+results.rows.item(0).prenom);
    $( '<div class="ui-loader ui-overlay-shadow ui-body-e ui-corner-all"><p style="padding: 0 10px"> DB Loaded </p></div>' )
        .css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 10 })
        .appendTo( $.mobile.pageContainer ).delay( 800 ).fadeOut( 400, function() { $( this ).remove(); });
}

function urlParam( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return results[1];
}