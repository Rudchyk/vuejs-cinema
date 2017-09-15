<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length && filteredMovies != ''">
            <movie-item
                v-for="movie in filteredMovies"
                class="movie"
                :movie="movie.movie"
            >
                <div class="movie-sessions">
                    <div
                        v-for="session in filteredSession(movie.sessions)"
                        class="session-time-wrapper tooltip-wrapper"
                        v-tooltip="{ seats: session.seats}"
                    >
                        <div class="session-time">
                            {{ formatSessionTime(session.time) }}
                        </div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            {{ noResults }}
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres.js';
    import times from '../util/times.js';
    import MovieItem from './MovieItem.vue';

    export default {
        data() {
            return {}
        },
        props: ['genre', 'time', 'movies', 'day'],
        methods: {
            moviePassesGenreFilter(movie) {
                let genreList,
                    result = true;

                if (this.genre.length) {
                    genreList = movie.movie.Genre.split(', ');
                    this.genre.forEach(genre => {
                        if(genreList.indexOf(genre) === -1) {
                            result = false;
                        }
                    });
                }

                return result;
            },
            sessionPassesTimeFilter(session) {
                let result;

                if (!this.day.isSame(this.$moment(session.time), 'day')) {
                    result = false;
                } else if (this.time === 0 || this.time.length === 2) {
                    result = true;
                } else if (this.time[0] === times.AFTER_6PM) {
                    result = this.$moment(session.time).hour() >= 18;
                } else {
                    result = this.$moment(session.time).hour() < 18;
                }
                return result;
            },
            formatSessionTime(raw) {
                return this.$moment(raw).format('h:mm A');
            },
            filteredSession(sessions) {
                return sessions.filter(this.sessionPassesTimeFilter);
            }
        },
        computed: {
            filteredMovies() {
                return this.movies
                    .filter(this.moviePassesGenreFilter)
                    .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            },
            noResults() {
                let times = this.time.join(', '),
                    genre = this.genre.join(', ');

                return `No results for ${times}${times.length && genre.length ? ', ' : ''}${genre}.`;
            }
        },
        components: {
            MovieItem
        }
    }
</script>