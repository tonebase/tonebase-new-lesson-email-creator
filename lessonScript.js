var jqueryNoConflict = jQuery;

// === SETUP HANDLEBARS TEMPLATES ==
var templates = [
  {
    templateName: "preheaderTemplate.handlebars",
    templateId: "#preheader-insert"
  },
  {
    templateName: "logoTemplate.handlebars",
    templateId: "#logo-insert"
  },
  {
    templateName: "mainCTAImageTemplate.handlebars",
    templateId: "#cta-image-insert"
  },
  {
    templateName: "mainCTATemplate.handlebars",
    templateId: "#main-cta-insert"
  },
  {
    templateName: "metadataTemplate.handlebars",
    templateId: "#metadata-insert"
  },
  {
    templateName: "artistTemplate.handlebars",
    templateId: "#artist-insert"
  },
  {
    templateName: "artistCTATemplate.handlebars",
    templateId: "#artist-cta-insert"
  },
  {
    templateName: "stripScriptTemplate.handlebars",
    templateId: "#strip-script"
  }
];

// === SUB HELPERS ===

function retriveData(lessonSlug, showHTML) {
  const dataURL = `//tonebase-api-production.herokuapp.com/v2/lessons/preview?slug=${lessonSlug}`;

  jqueryNoConflict.getJSON(dataURL, function(data) {
    if (data) {
      console.log("JSON =>", data);

      // Add show html property
      data.showHTML = showHTML;

      // Limit the description length
      data.description = data.description.substring(0, 280);

      // Create the wrapped data object for handlebars
      var finalData = {
        data: data
      };

      // Render handlebars templates
      templates.forEach(function(templateData) {
        var templateName = templateData.templateName;
        var templateId = templateData.templateId;

        if (templateName && templateId) {
          renderHandlebarsTemplate(templateName, templateId, finalData);
        }
      });

      // Fill in dyanmic info.
      setTimeout(function() {
        handleDynamicFields(data);
      }, 3000);
    } else {
      alert("No data received. Check lesson slug. You entered =>", lessonSlug);
    }
  });
}

function renderHandlebarsTemplate(withTemplate, inElement, withData) {
  getTemplateAjax(withTemplate, function(template) {
    jqueryNoConflict(inElement).html(template(withData));
  });
}

function getTemplateAjax(path, callback) {
  var source, template;

  var prependURL = "";
  if (window.location.href.indexOf("localhost") === -1)
    prependURL = "https://tonebase.github.io/tonebase-new-lesson-email-creator";

  jqueryNoConflict.ajax({
    url: `${prependURL}/templates/${path}`,
    success: function(data) {
      source = data;
      template = Handlebars.compile(source);
      if (callback) callback(template);
    }
  });
}

// === DYNAMIC ===

function handleDynamicFields(data) {
  const lessonType = jqueryNoConflict("#type_insert_dyna");
  const lessonDifficulty = jqueryNoConflict("#difficulty_insert_dyna");
  const metadataWrapper = jqueryNoConflict("#metadata_color_dyna");
  const artistOneLiner = jqueryNoConflict("#artist_one_liner_dyna");

  handleLessonType(lessonType, parseInt(data.lesson_type, 10));
  handleLessonDifficulty(lessonDifficulty, parseInt(data.difficulty, 10));
  handleMetadataColor(metadataWrapper, parseInt(data.lesson_type, 10));
  handleArtistOneLiner(artistOneLiner, data.artist_slug);
}

function handleLessonType(DOMObj, lessonType) {
  switch (lessonType) {
    case 0:
      jqueryNoConflict(DOMObj).text("Technique");
      break;
    case 1:
      jqueryNoConflict(DOMObj).text("Repertoire");
      break;
    case 2:
      jqueryNoConflict(DOMObj).text("Interview");
      break;
    default:
      jqueryNoConflict(DOMObj).text("Lesson");
  }
}

function handleLessonDifficulty(DOMObj, lessonDifficulty) {
  switch (lessonDifficulty) {
    case 0:
      jqueryNoConflict(DOMObj).text("All Levels");
      break;
    case 1:
      jqueryNoConflict(DOMObj).text("Intermediate");
      break;
    case 2:
      jqueryNoConflict(DOMObj).text("Advanced");
      break;
    default:
      jqueryNoConflict(DOMObj).text("All Levels");
  }
}

function handleMetadataColor(DOMObj, lessonType) {
  switch (lessonType) {
    case 0:
      jqueryNoConflict(DOMObj).attr("style", "color:#faa000;");
      break;
    case 1:
      jqueryNoConflict(DOMObj).attr("style", "color:#e14f3d;");
      break;
    case 2:
      jqueryNoConflict(DOMObj).attr("style", "color:#ffc82c;");
      break;
    default:
      jqueryNoConflict(DOMObj).attr("style", "color:#e14f3d;");
  }
}

function handleArtistOneLiner(DOMObj, artistSlug) {
  console.log("HANDLE ARTIST ONE LINER");
  const dataURL = `//tonebase-api-production.herokuapp.com/v2/artists/narrow?slug=${artistSlug}&property=one_liner`;
  console.log(dataURL);

  jqueryNoConflict.get(dataURL, function(data) {
    console.log("Artist One Liner =>", data);

    if (data) {
      jqueryNoConflict(DOMObj).text(data);
    }
  });
}

// === MAIN ===

jqueryNoConflict(document).ready(function() {
  // === EDIT HERE ===
  const lessonSlug = prompt("Please enter the lesson slug:"); // "interview-with-marcin-dylla-miami-2019";
  const showHTML = confirm(
    "Would you like to see the rendered HTML? [7 second delay]"
  );

  retriveData(lessonSlug, showHTML);
});
