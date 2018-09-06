var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'bD0WwE93mSXQj0Fbdi6E5zPW4Fp5WwyE';


App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });

        this.getGif(searchingText, function(gif){
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

    getGif: function(searchingText) {  // 1.
        return new Promise(
            function (resolve, reject) {
                var url = 'http://api.giphy.com/v1/gifs/random?api_key=' + 'PLv6zi9yKGz56IDesdoP2q6QlckAzHom' + '&tag=' + searchingText;  // 2.
                var xhr = new XMLHttpRequest();  // 3.
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText).data; // 4.
                        var gif = {  // 5.
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif)
                    } else{
                        reject(new Error(this.statusText))
                    }
                };
                xhr.onerror = function(){
                    reject(new Error(
                        `XMLHttpRequest Error: ${this.statusText}`))
                }
                xhr.send();
            }
        )   
    },

    render: function(){

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search 
                    onSearch={this.handleSearch}
                />
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>    
        )
    }
});
