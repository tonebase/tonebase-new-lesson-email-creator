var jqueryNoConflict = jQuery;

//begin main function
jqueryNoConflict(document).ready(function() {
  retriveData();
});
//end main function

// grab data
function retriveData() {
  var dataSource = "PianoData.json";

  jqueryNoConflict.getJSON(dataSource, renderPreheaderTemplate);
  jqueryNoConflict.getJSON(dataSource, renderMainLogoTemplate);
  jqueryNoConflict.getJSON(dataSource, renderEmailMetadataTemplate);
  jqueryNoConflict.getJSON(dataSource, renderNoteFromTheTeamTemplate);
  jqueryNoConflict.getJSON(dataSource, renderFullWidthLessonTemplate);
  jqueryNoConflict.getJSON(dataSource, renderTwoColLessonsTemplate);
  jqueryNoConflict.getJSON(dataSource, renderImageOfTheWeekTemplate);
  jqueryNoConflict.getJSON(dataSource, renderFullWidthBlogTemplate);
  jqueryNoConflict.getJSON(dataSource, renderTwoColBlogsTemplate);
  jqueryNoConflict.getJSON(dataSource, renderEmailFooterTemplate);
  jqueryNoConflict.getJSON(dataSource, renderStripScripts);
}

function renderPreheaderTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "emailPreheaderTemplate.handlebars",
    "#preheader-insert",
    data
  );
}

function renderMainLogoTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate("mainLogoTemplate.handlebars", "#main-logo", data);
}

function renderEmailMetadataTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "emailMetadataTemplate.handlebars",
    "#email-metadata",
    data
  );
}

function renderNoteFromTheTeamTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "noteFromTheTeamTemplate.handlebars",
    "#note-from-the-team",
    data
  );
}

function renderFullWidthLessonTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "fullWidthLessonTemplate.handlebars",
    "#full-width-lessons",
    data
  );
}

function renderFullWidthBlogTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "fullWidthBlogTemplate.handlebars",
    "#full-width-blogs",
    data
  );
}

function renderTwoColLessonsTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "twoColLessonsTemplate.handlebars",
    "#two-col-lessons",
    data
  );
}

function renderTwoColBlogsTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "twoColBlogsTemplate.handlebars",
    "#two-col-blogs",
    data
  );
}

function renderImageOfTheWeekTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "imageOfTheWeekTemplate.handlebars",
    "#image-of-the-week",
    data
  );
}

function renderEmailFooterTemplate(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "emailFooterTemplate.handlebars",
    "#footer-insert",
    data
  );
}

function renderStripScripts(data) {
  handlebarsDebugHelper();
  renderHandlebarsTemplate(
    "stripScriptTemplate.handlebars",
    "#strip-script",
    data
  );
}

// render handlebars templates via ajax
function getTemplateAjax(path, callback) {
  var source, template;
  jqueryNoConflict.ajax({
    url: `/templates/${path}`,
    success: function(data) {
      source = data;
      template = Handlebars.compile(source);
      if (callback) callback(template);
    }
  });
}

// function to compile handlebars template
function renderHandlebarsTemplate(withTemplate, inElement, withData) {
  getTemplateAjax(withTemplate, function(template) {
    jqueryNoConflict(inElement).html(template(withData));
  });
}

// add handlebars debugger
function handlebarsDebugHelper() {
  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
  });
}
