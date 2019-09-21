
<template>
	<div>
		{{data}}
	</div>
</template>
<script>
export default {
	name : 'security',
	data() {
		return {
			data:'child'
		}
	},
	methods:{
		children(e){
			console.log('child',e);
			this.data = 'fathcer=>childer'
		}
	}
}

</script>