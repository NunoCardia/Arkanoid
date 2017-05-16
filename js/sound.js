window.SetVolume = function(val)
{
    var player = document.getElementById('song');
    player.volume = val / 100;
}