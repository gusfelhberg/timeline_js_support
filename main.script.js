var main_timeline = $(function () {
  var JQTL_VER = $.fn.Timeline ? $.fn.Timeline.Constructor.VERSION : "2.1.x",
    JQUERY_VER = "3.5.1",
    tlElem = $("#my-timeline"), // Cached timeline element
    now = new Date(),
    listItems = [],
    incr = 1,
    maxList = 13, // display max rows of sidebar
    begin = getDateString("2020-07-01 12:00 AM"), //now.setDate(now.getDate() - 3),
    end = undefined
  now.setMonth(now.getMonth() + 2)
  end = now.setDate(now.getDate() - 1)
  listItems.push("<span></span>")
  listItems.push("<span>Worker</span>")
  listItems.push("<span>Employer</span>")
  listItems.push("<span>Provider</span>")
  listItems.push("<span>WorkSafeBC</span>")
  listItems.push("<span>Entitlement Officer</span>")
  listItems.push("<span>Case Manager</span>")
  listItems.push("<span>RTWS</span>")
  listItems.push("<span>Health Care</span>")
  listItems.push("<span></span>")
  listItems.push("<span></span>")
  listItems.push("<span></span>")
  listItems.push("<span></span>")
  // for (incr = 1; incr <= 6; incr++) {
  //     listItems.push('<span>Row Name' + incr + '</span>');
  // }

  // listItems.push('<span></span>');

  // Timeline options are defined as global variables
  window.tlOpts = {
    type: "mixed",
    startDatetime: begin,
    endDatetime: end,
    scale: "day",
    minGridSize: 30,
    headline: {
      display: true,
      title:
        '<i class="jqtl-icon mr-h"></i>Claim Lifecycle and Predictive Models',
      range: true,
      local: "en-US",
      format: {
        timeZone: "UTC",
        hour12: false,
      },
    },
    sidebar: {
      list: listItems,
      sticky: true,
    },
    rows: listItems.length,
    ruler: {
      top: {
        lines: ["year", "month", "day"],
        format: {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      },
      bottom: {
        lines: ["day"],
        format: {
          day: "numeric",
        },
      },
    },
    hideScrollbar: true,
    eventData: generateEventData(begin, end), // Generate initial event data
  }

  // Initialize the timeline
  tlElem.Timeline(window.tlOpts)
  tlElem.Timeline("openEvent", function (event, eventNodes) {
    // Define an event handler for getting event nodes on the timeline
    console.log(
      "The event node with eventID: " + event.eventId + " was clicked.",
      event,
      eventNodes
    )
    openDialog(eventNodes)
  })

  // Handler for checking various methods
  $("#initialized").on("click", function () {
    // For checking the initialized method
    tlElem.Timeline(
      "initialized",
      function () {
        $(arguments[0]).removeClass("occupy-advance")
        console.log(arguments[2].message)
      },
      {
        message:
          'The "initialized" method can be called at only first time in the instantiated timeline.',
      }
    )
    $(window).scrollTop(0)
  })

  $("#destroy").on("click", function () {
    // For checking the destroy method
    if ($(this).attr("data-destroyed")) {
      // Reinstantiating the timeline does not recover the previously bound openEvent method event.
      /*
            $(this).removeAttr('data-destroyed').text('Destroy');
            $('main div.occupy-advance').attr('id', 'my-timeline');
            tlElem = $('#my-timeline');
            tlElem.Timeline( window.tlOpts );
            tlElem.Timeline('openEvent', function( event, eventNodes ) {
              openDialog( eventNodes );
            });
            */
      window.location.reload()
    } else {
      tlElem.Timeline("destroy")
      $("main").prepend('<div class="occupy-advance"></div>')
      $(this).attr("data-destroyed", "true").text("Relaunch")
      alert(
        'At the "destroy" method removed the timeline element itself from the DOM.'
      )
    }
  })

  $("#toggle-view").on("click", function (e) {
    var nowShown = $(e.target).attr("data-shown") === "true"
    if (nowShown) {
      tlElem.Timeline("hide")
      $(e.target).attr("data-shown", "false").text("Show")
    } else {
      tlElem.Timeline("show")
      $(e.target).attr("data-shown", "true").text("Hide")
    }
  })

  $("#add-event").on("click", function () {
    // For checking the addEvent method
    var nowDt = new Date(),
      newEvt = [
        {
          eventId: 4,
          start: getModDateString(nowDt, {
            day: "+5",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          end: getModDateString(nowDt, {
            day: "+9",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          row: 7,
          label: "Additional event 4",
          content: "This is an event added by the addEvent method.",
        },
        {
          eventId: 40,
          start: getModDateString(nowDt, {
            day: "+5",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          end: getModDateString(nowDt, {
            day: "+9",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          row: 8,
          label: "Additional event 40",
          content: "This is an event added by the addEvent method.",
        },
        {
          eventId: 1,
          start: getModDateString(nowDt, {
            day: "+5",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          end: getModDateString(nowDt, {
            day: "+9",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          row: 3,
          label: "Additional event 1",
          content: "This is an event added by the addEvent method.",
        },
      ]
    //newEvt = createEvents(10);
    tlElem.Timeline(
      "addEvent",
      newEvt,
      function (elm, opts, usrdata, addedEvents) {
        usrdata["elementId"] = $(elm).attr("id")
        console.log("Added new event(s)", elm, opts, usrdata, addedEvents)
      },
      {}
    )
  })

  $("#update-event").on("click", function () {
    // For checking the updateEvent method
    var nowDt = new Date(),
      newEvt = [
        {
          eventId: 34,
          start: getModDateString(nowDt, {
            day: "+5",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          end: getModDateString(nowDt, {
            day: "+9",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          row: 3,
          label: "Updated event 34",
          content: "Yahoo!",
        },
        {
          eventId: 1,
          start: getModDateString(nowDt, {
            day: "+11",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          end: getModDateString(nowDt, {
            day: "+12",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          row: 1,
          label: "Updated event 1",
          content: "This is an event updated by the updateEvent method.",
        },
        {
          eventId: 4,
          start: getModDateString(nowDt, {
            day: "+11",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          end: getModDateString(nowDt, {
            day: "+12",
            h: "rand",
            min: "rand",
            sec: "rand",
          }),
          row: 8,
          label: "Updated event 4",
          content: "This is an event updated by the updateEvent method.",
        },
      ]
    tlElem.Timeline(
      "updateEvent",
      newEvt,
      function (elm, opts, usrdata, updatedEvents) {
        usrdata["elementId"] = $(elm).attr("id")
        console.log("Updated any event(s)", elm, opts, usrdata, updatedEvents)
      },
      []
    )
  })

  $("#remove-event").on("click", function () {
    // For checking the removeEvent method
    var delCond = [1, 2, 3, 4]
    tlElem.Timeline(
      "removeEvent",
      delCond,
      function (elm, opts, usrdata, removedEvents) {
        usrdata.elementId = $(elm).attr("id")
        console.log("Removed any event(s)", elm, opts, usrdata, removedEvents)
      },
      [1, 2, 3]
    )
  })

  $("#dateback").on("click", function () {
    // For checking the dateback method
    var methodOpts = {
      scale: "day",
      range: 30,
      shift: true,
    }
    tlElem.Timeline(
      "dateback",
      methodOpts,
      function () {
        console.log("The timeline went back to the past.", arguments)
      },
      methodOpts
    )
  })

  $("#dateforth").on("click", function () {
    // For checking the dateforth method
    var methodOpts = {
      scale: "day",
      range: 5,
      shift: true,
    }
    tlElem.Timeline(
      "dateforth",
      methodOpts,
      function () {
        console.log("The timeline went forth to the future.", arguments)
      },
      methodOpts
    )
  })

  $("#reload").on("click", function () {
    // For checking the reload method
    tlElem.Timeline("reload", { reloadCacheKeep: false }, function (elm) {
      // It is necessary to perform a reload with the cache destroyed once in order to
      // completely initialize the timeline, and then enable the new cache.
      $(elm).Timeline(
        "reload",
        { reloadCacheKeep: true },
        function () {
          console.log(arguments[2].message)
          $(window).scrollTop(0)
        },
        { message: "Completely Reloaded!" }
      )
    })
  })

  $("#alignment").on("change", function (e) {
    var alignValue = e.target.value,
      duration = "fast"
    tlElem.Timeline("alignment", alignValue, duration)
  })

  $("#change-theme").on("change", function (e) {
    // To change the theme of timeline
    var themeName = e.target.value,
      newTheme = null
    switch (themeName) {
      case "darken":
        newTheme = {
          theme: {
            name: themeName,
            text: "#FAFDFF",
            subtext: "#B4AEB1",
            offtext: "#736D71",
            modesttext: "#594E52",
            line: "#9FA09E",
            offline: "#595959",
            activeline: "#F73734",
            background: "#171615",
            invertbg: "#F7F6F5",
            striped1: "#4C4A49",
            striped2: "#C9CACA",
            active: "#F73734",
            marker: "#FFDC00",
            gridbase: "#4E454A",
          },
          event: {
            text: "#24140e",
            border: "#7E837F",
            background: "#9FA09E",
          },
        }
        break
      case "nightly":
        newTheme = {
          theme: {
            name: themeName,
            text: "#E7E7EB",
            subtext: "#C0A2C7",
            offtext: "#736D71",
            modesttext: "#594E52",
            line: "#B578D0",
            offline: "#7627A3",
            activeline: "#B578D0",
            background: "#471060",
            invertbg: "#F7F6F5",
            striped1: "#3E1950",
            striped2: "#9079B6",
            active: "#F73734",
            marker: "#F6AF98",
            gridbase: "#4E454A",
          },
          event: {
            text: "#E7E7EB",
            border: "#B578D0",
            background: "#915DA3",
          },
        }
        break
      default:
        // The bundled defaults of the timeline plugin can be obtained from the properties in the constructor.
        newTheme = $.fn.Timeline.Constructor.Default.colorScheme
        break
    }
    tlElem.Timeline("reload", { reloadCacheKeep: true }, (elm) => {
      var newOpts = { reloadCacheKeep: false }
      if (newTheme) {
        newOpts.colorScheme = newTheme
        $("body").removeAttr("class").attr("class", newTheme.theme.name)
      }
      $(elm).Timeline("reload", newOpts)
      $(window).scrollTop(0)
    })
  })

  // Various helper functions
  function getDateArray(date) {
    // Helper to get each elements of Date object as an array
    var _dt = date instanceof Date ? date : new Date(date)
    return [
      _dt.getFullYear(),
      _dt.getMonth(),
      _dt.getDate(),
      _dt.getHours(),
      _dt.getMinutes(),
      _dt.getSeconds(),
      _dt.getMilliseconds(),
    ]
  }
  function getDateString(date) {
    // Helper to get Date object as a string of "Y-m-d H:i:s" format
    var _dt = getDateArray(date)
    // return `${_dt[0]}-${_dt[1] + 1}-${_dt[2]} ${_dt[3]}:${_dt[4]}:${_dt[5]}`;
    return (
      _dt[0] +
      "-" +
      (_dt[1] + 1) +
      "-" +
      _dt[2] +
      " " +
      _dt[3] +
      ":" +
      _dt[4] +
      ":" +
      _dt[5]
    )
  }
  function getModDateString(date, mods) {
    // Helper to get the date string after updating the date with the specified amount time.
    var baseDt =
        date instanceof Date ? new Date(date.getTime()) : new Date(date),
      getRandomInt = function (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
      },
      found
    if (mods && typeof mods === "object") {
      for (var _key in mods) {
        found = null
        switch (true) {
          case /^y(|ears?)$/i.test(_key):
            if (
              typeof mods[_key] === "string" &&
              /^(-|\+)\d+$/i.test(mods[_key])
            ) {
              found = mods[_key].match(/^(-|\+)(\d+)$/)
              if (found[1] === "-") {
                baseDt.setFullYear(baseDt.getFullYear() - Number(found[2]))
              } else {
                baseDt.setFullYear(baseDt.getFullYear() + Number(found[2]))
              }
            } else if ("rand" === mods[_key]) {
              baseDt.setFullYear(getRandomInt(1, new Date().getFullYear()))
            } else {
              baseDt.setFullYear(Number(mods[_key]))
            }
            break
          case /^mon(|ths?)$/i.test(_key):
            if (
              typeof mods[_key] === "string" &&
              /^(-|\+)\d+$/i.test(mods[_key])
            ) {
              found = mods[_key].match(/^(-|\+)(\d+)$/)
              if (found[1] === "-") {
                baseDt.setMonth(baseDt.getMonth() - Number(found[2]))
              } else {
                baseDt.setMonth(baseDt.getMonth() + Number(found[2]))
              }
            } else if ("rand" === mods[_key]) {
              baseDt.setMonth(getRandomInt(0, 11))
            } else {
              baseDt.setMonth(
                Number(mods[_key]) == 12 ? 11 : Number(mods[_key])
              )
            }
            break
          case /^d(|ays?)$/i.test(_key):
            if (
              typeof mods[_key] === "string" &&
              /^(-|\+)\d+$/i.test(mods[_key])
            ) {
              found = mods[_key].match(/^(-|\+)(\d+)$/)
              if (found[1] === "-") {
                baseDt.setDate(baseDt.getDate() - Number(found[2]))
              } else {
                baseDt.setDate(baseDt.getDate() + Number(found[2]))
              }
            } else if ("rand" === mods[_key]) {
              baseDt.setDate(getRandomInt(1, 31))
            } else {
              baseDt.setDate(Number(mods[_key]))
            }
            break
          case /^h(|ours?)$/i.test(_key):
            if (
              typeof mods[_key] === "string" &&
              /^(-|\+)\d+$/i.test(mods[_key])
            ) {
              found = mods[_key].match(/^(-|\+)(\d+)$/)
              if (found[1] === "-") {
                baseDt.setHours(baseDt.getHours() - Number(found[2]))
              } else {
                baseDt.setHours(baseDt.getHours() + Number(found[2]))
              }
            } else if ("rand" === mods[_key]) {
              baseDt.setHours(getRandomInt(0, 23))
            } else {
              baseDt.setHours(Number(mods[_key]))
            }
            break
          case /^min(|utes?)$/i.test(_key):
            if (
              typeof mods[_key] === "string" &&
              /^(-|\+)\d+$/i.test(mods[_key])
            ) {
              found = mods[_key].match(/^(-|\+)(\d+)$/)
              if (found[1] === "-") {
                baseDt.setMinutes(baseDt.getMinutes() - Number(found[2]))
              } else {
                baseDt.setMinutes(baseDt.getMinutes() + Number(found[2]))
              }
            } else if ("rand" === mods[_key]) {
              baseDt.setMinutes(getRandomInt(0, 59))
            } else {
              baseDt.setMinutes(Number(mods[_key]))
            }
            break
          case /^s(|(ec|onds?))$/i.test(_key):
            if (
              typeof mods[_key] === "string" &&
              /^(-|\+)\d+$/i.test(mods[_key])
            ) {
              found = mods[_key].match(/^(-|\+)(\d+)$/)
              if (found[1] === "-") {
                baseDt.setSeconds(baseDt.getSeconds() - Number(found[2]))
              } else {
                baseDt.setSeconds(baseDt.getSeconds() + Number(found[2]))
              }
            } else if ("rand" === mods[_key]) {
              baseDt.setSeconds(getRandomInt(0, 59))
            } else {
              baseDt.setSeconds(Number(mods[_key]))
            }
            break
          default:
            break
        }
      }
    }
    return getDateString(baseDt)
  }
  function createEvents(num) {
    // Helper to randomly generate a specified number of events
    var nowDt = new Date(),
      _evts = [],
      _max = num || 1,
      _startDt,
      _endDt,
      _row,
      i

    for (i = 0; i < _max; i++) {
      _startDt = getDateString(
        nowDt.setDate(nowDt.getDate() + (Math.floor(Math.random() * 10) + 1))
      )
      // _startDt = getDateString('2020-07-06 00:00:00.000');
      _endDt = getDateString(
        nowDt.getTime() +
          (Math.floor(Math.random() * 7) + 1) * 24 * 60 * 60 * 1000
      )
      _row = Math.floor(Math.random() * 12) + 1
      _evts.push({
        start: _startDt,
        end: _endDt,
        row: _row,
        label: "Created new event (" + (i + 1) + ")",
        content: "This is an event added by the addEvent method.",
      })
    }
    return _evts
  }
  function loadEventsDataJSON() {
    // Generate an initial event nodes for the timeline.
    var filePath = "../src/events.json"
    var json = JSON.parse($.ajax({ url: filePath, async: false }).responseText)

    console.log(json)
    return json
  }

  function generateEventData(begin, end) {
    events = loadEventsDataJSON()
    return events
  }

  function openDialog(nodes) {
    var $backdrop = $("<div></div>", { id: "backdrop-overlay" }),
      $dialog = $("<div></div>", { id: "dialog" }),
      $headline = $("<div></div>", { id: "dialog-header" }),
      $body = $("<div></div>", { id: "dialog-body" }),
      $footer = $("<div></div>", { id: "dialog-footer" }),
      $dismiss = $("<div></div>", { id: "dialog-dismiss" }),
      $close = $("<button></button>", { id: "dialog-close" })

    if ($(document).find("#backdrop-overlay").length == 0) {
      $("body").css({ position: "relative" })
      $backdrop.css({
        position: "absolute",
        top: 0,
        left: 0,
        width: "calc(100% + 2em)",
        height: "calc(100% + 2em)",
        margin: "-1em",
        padding: 0,
        backgroundColor: "rgba(51,51,51,0.4)",
        zIndex: 9999,
      })
      $backdrop.on("click", function () {
        closeDialog()
      })
      $("body").append($backdrop)
    } else {
      $(document)
        .find("#backdrop-overlay")
        .css({ display: "block", visibility: "visible" })
    }
    $dialog.css({
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      top: "50%",
      left: "50%",
      width: "60%",
      height: "60%",
      backgroundColor: "#FFF",
      borderRadius: "6px",
      zIndex: 10000,
      transform: "translate(-50%,-50%)",
      boxShadow: "0 0 10px 10px rgba(51,51,51,0.1)",
      opacity: 0,
    })
    $headline.css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 0,
      padding: "4px 6px",
      borderRadius: "6px 6px 0 0",
      borderBottom: "dotted 1px #E8E8E8",
      backgroundColor: "#F4F4F4",
      zIndex: 10001,
    })
    $dismiss.css({
      textAlign: "center",
      verticalAlign: "middle",
      width: "90px",
    })
    $dismiss.append('<span class="dismiss-icon"></span>')
    $(document).on("click", ".dismiss-icon", function () {
      closeDialog()
    })
    $headline.append(nodes.label, $dismiss)
    $body.css({
      margin: 0,
      padding: "6px",
      height: "100%",
      backgroundColor: "#FFF",
      zIndex: 10001,
    })
    $body.append(nodes.content)
    $footer.css({
      margin: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "end",
      alignContent: "end",
      padding: "10px 6px",
      borderRadius: "0 0 6px 6px",
      borderTop: "dotted 1px #E8E8E8",
      backgroundColor: "#FFF",
      zIndex: 10001,
    })
    $close
      .css({ margin: "auto", alignSelf: "end", textAlign: "right" })
      .text("Close")
    $footer.append($close)
    $close.on("click", function () {
      closeDialog()
    })
    $dialog.append($headline, $body, $footer)
    $("body").append($dialog)
    $dialog.animate({ opacity: 1 }, 300)
  }
  function closeDialog() {
    $("#dialog").animate({ opacity: 0 }, 150, "linear", function () {
      $(this).remove()
      $(document)
        .find("#backdrop-overlay")
        .css({ display: "none", visibility: "hidden" })
    })
  }
})
module.exports = main_timeline
