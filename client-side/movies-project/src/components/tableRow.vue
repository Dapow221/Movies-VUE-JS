<template>
    <td v-if="page === 'movies'" style="color: white;">{{ index + 1 }}</td>
    <td v-if="page === 'movies'" style="color: white;">{{ movie.title }}</td>
    <td v-if="page === 'movies'"><img :src="movie.imgUrl" width="150"></td>
    <td v-if="page === 'movies'" style="color: white;">{{ movie.synopsis }}</td>
    <td v-if="page === 'movies'" style="color: white;">{{ movie.trailerUrl }}</td>
    <td v-if="page === 'movies'" style="color: white;">{{ movie.rating }}</td>
    <td v-if="page === 'movies'" style="color: white;">{{ movie.Genre.name }}</td>
    <td v-if="page === 'movies'" style="color: white;">{{ movie.User.email }}</td>
    <td v-if="page === 'movies'" style="color: white; display: flex;">
        <select v-model="status" @change="changeStatus(status, movie.id)" style="color: black;">
            <option value="active">active</option>
            <option value="inactive">inactive</option>
            <option value="archived">archived</option>
        </select>
        <button type="button" class="btn btn-primary" style="margin-left: 15px;"
            @click.prevent="clickEdit('EditMovies', movie.id)">Edit</button>
    </td>

    <td v-if="page === 'genres'" style="color: white;">{{ index + 1 }}</td>
    <td v-if="page === 'genres'" style="color: white;">{{ genre.name }}</td>

    <td v-if="page === 'histories'" style="color: white;">{{ index + 1 }}</td>
    <td v-if="page === 'histories'" style="color: white;">{{ histories.title }}</td>
    <td v-if="page === 'histories'" style="color: white;">{{ histories.description }}</td>
    <td v-if="page === 'histories'" style="color: white;">{{ getDate(histories.updatedAt) }}</td>
    <td v-if="page === 'histories'" style="color: white;">{{ histories.updatedBy }}</td>
</template>

<script>
export default {
    emits: ['changeStatus', 'AddEdit'],

    props: {
        movie: String,
        page: String,
        index: Number,
        genre: String,
        histories: String,
    },

    data() {
        return {
            status: ""
        }
    },

    methods: {
        changeStatus(status, id) {
            this.$emit('changeStatus', status, id)
        },

        clickEdit(page, id) {
            this.$emit('addEdit', page, id)
        },

        getDate(datetime) {
            const date = new Date(datetime)
            const day = date.getDate()
            const month = date.toLocaleDateString('id-ID', { month: 'long' })
            const year = date.getFullYear()
            const hours = date.getHours()
            const minutes = date.getMinutes()

            const formattedDate = `${day} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
            return formattedDate
        }

    },

    created() {
        if (this.page === "movies") {
            this.status = this.movie.status
        }
    }
}
</script>

<style lang="scss" scoped></style>