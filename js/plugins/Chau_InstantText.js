/*:============================================================================

  @author Chaucer

  @plugindesc | Instant Text : Version - 1.1.0 | Set text speed to instant.

  @help
============================================================================
  Introduction :
============================================================================

  ()()
  (^.^)
  c(")(")

  This plugin allows you to set text speed to instant.

============================================================================
  Requirements :
============================================================================

  ---------------------------------------
  None.
  ---------------------------------------

============================================================================
  Instructions :
============================================================================

  ---------------------------------------
  Plugin Commands :
  ---------------------------------------

     command : InstantText VALUE
    ---------------------------------------
     description : replace value with either "true" or "false"( no quotes ).


============================================================================
  Terms Of Use :
============================================================================

  This Plugin may be used commercially, or non commercially. This plugin may
  be extended upon, and or shared freely as long as credit is given to it's
  author(s). This plugin may NOT be sold, or plagiarized.

============================================================================
  Version History :
============================================================================

  â— Version : 1.0.0
  â— Date : ??/??/????
    â˜… Release.

  â— Version : 1.0.1
  â— Date : ??/??/????
    â˜… Minor improvements to code.

  â— Version : 1.1.0
  â— Date : 02/01/2020
    â˜… improved help file.
    â˜… Improved code structure.

============================================================================
  Contact Me :
============================================================================

  If you have questions, about this plugin, or commissioning me, or have
  a bug to report, please feel free to contact me by any of the below
  methods.

  rmw : https://forums.rpgmakerweb.com/index.php?members/chaucer.44456
  discord : chaucer#7538
  skypeId : chaucer1991
  gmail : chaucer91

============================================================================
  Support Me :
============================================================================

   If you like the content I create, and want to contribute to help me
  making more plugins on a regular basis, you can donate, or pledge through
  any of the links listed below!

  ko-fi : https://ko-fi.com/chaucer91
  paypal.me : https://paypal.me/chaucer91
  patreon : https://www.patreon.com/chaucer91

============================================================================
  Special Thanks :
============================================================================

  Patrons :

  â˜… Benjamin Humphrey

============================================================================

  @param defaultValue
  @text Default Value
  @desc Should this plugin be enabled by default?
  @default true
  @type boolean

*/

//=============================================================================
var Imported = Imported || {};
Imported['CHAU INSTANT TEXT'] = true;
//=============================================================================
var Chaucer = Chaucer || {};
Chaucer.instantText = {};
//=============================================================================


( function ( $ ) { // CONFIG:

  $ = $ || {};

//Create plugin information.
//============================================================================

  $.errMessage = [
    "Instant Text description has been altered! Either revert",
    "the description of the plugin back to normal, or modify the variable",
    "named pluginIdentifier inside the plugin to prevent further errors!!!"
  ].join( '\n' );

  var pluginIdentifier = /(Instant Text) : Version - (\d+\.\d+\.\d+)/;
   var length = $plugins.length;
  for ( var i = 0; i < length; i++ ) {
    if ( $plugins[i].description.match( pluginIdentifier ) ) {
      $.alias = {};
      $.name = RegExp.$1;
      $.version = RegExp.$2;
      $.params = Parse( $plugins[i].parameters );
      $.author = "Chaucer";
      break;
    };
  };

  if ( !$.name || !$.version ) throw new Error( $.errMessage );

//============================================================================


//=============================================================================
// Custom :
//=============================================================================

  //--------------------------------------------------------------------------
  function Parse( data )
  { // parse data.
  //--------------------------------------------------------------------------
    try {

      data = JSON.parse( data ); // try to turn data to object :

    } catch ( error ) {

      data = data; // if failed, data remains a string :

    } finally {

      if ( typeof data === 'object' ) { // if data is an object :

        var keys = Object.keys( data ); // get all keys for object :
        for (var i = 0; i < keys.length; i++) {
          data[keys[i]] = Parse( data[keys[i]] );
        }

      }

    }

    return data;

  };

  //-----------------------------------------------------------------------------
  $.compareVersion = function ( current, target )
  { // compare the current version with the target version.
  //-----------------------------------------------------------------------------

    var value = 0;

    // prepare version values provided :
    target = target.split( '.' );
    current = current.split( '.' );

    // compare version with target :
    value = Math.sign( current[0] - target[0] );
    if ( value === 0 ) value = Math.sign( current[1] - target[1] );
    if ( value === 0 ) value = Math.sign( current[2] - target[2] );

    return value;

    // -1 ( current < target );
    //  0 ( current == target )
    //  1  ( current > target )

  };

  $.enabled = $.params.defaultValue; // set plugin default value.

//=============================================================================
// Game_Interpreter :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias.GI_p_pluginCommand = Game_Interpreter.prototype.pluginCommand;
//-----------------------------------------------------------------------------
  Game_Interpreter.prototype.pluginCommand = function ( command, args )
  { // Alias of commandEnabled
//-----------------------------------------------------------------------------

    if ( command.toLowerCase() === 'instanttext' ) { // if InstantText :

      var arg = args[0].toLowerCase();
      $.enabled =  arg === 'true' ? true : arg === 'false' ? false : $.enabled;

    } else { // pass arguments and command along :

      $.alias.GI_p_pluginCommand.call( this, command, args );

    }

  };

//=============================================================================
// Window_Message :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias.WM_p_updateShowFast = Window_Message.prototype.updateShowFast;
//-----------------------------------------------------------------------------
  Window_Message.prototype.updateShowFast = function ()
  { // Alias of commandEnabled
//-----------------------------------------------------------------------------

    $.alias.WM_p_updateShowFast.call( this );
    if ( $.enabled ) this._showFast = true;

  };

//=============================================================================
} )( Chaucer.instantText );
//=============================================================================