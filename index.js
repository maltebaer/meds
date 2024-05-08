document.addEventListener('alpine:init', () => {
    Alpine.data('medis', function () {
        return {
            doseTime: null,
            ibuprofen: this.$persist([]),
            paracetamol: this.$persist([]),

            addDose(type) {
                let time = this.doseTime !== null ? new Date(this.doseTime).getTime() : Date.now()

                if (type === 'ibuprofen') {
                    this.ibuprofen.push(time)
                    this.ibuprofen.sort((a, b) => a - b)
                } else {
                    this.paracetamol.push(time)
                    this.paracetamol.sort((a, b) => a - b)
                }
            },

            calcNextDose(type) {
                let doses = type === 'ibuprofen' ? this.ibuprofen : this.paracetamol
                let waitingTime = type === 'ibuprofen' ? 8 : 6

                let lastDose = doses[doses.length - 1]
                let nextDose = new Date(lastDose)

                nextDose.setHours(nextDose.getHours() + waitingTime)

                return nextDose
            },

            clearMed(type) {
                if (type === 'ibuprofen') {
                    this.ibuprofen = []
                } else {
                    this.paracetamol = []
                }
            },

            displayDoseTime(doseTime) {
                let options = {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false
                }

                return new Intl.DateTimeFormat('de', options).format(doseTime)
            },

            displayRelativeDoseTime(doseTime) {
                let now = new Date()
                let diffInSeconds = Math.floor((now - doseTime) / 1000)
                let rtf = new Intl.RelativeTimeFormat('de', { numeric: 'auto' })

                let timeValue = diffInSeconds
                let timeUnit = 'second'

                if (Math.abs(diffInSeconds) >= 60 && Math.abs(diffInSeconds) < 3600) {
                    timeValue = Math.floor(diffInSeconds / 60)
                    timeUnit = 'minute'
                } else if (Math.abs(diffInSeconds) >= 3600 && Math.abs(diffInSeconds) < 86400) {
                    timeValue = Math.floor(diffInSeconds / 3600)
                    timeUnit = 'hour'
                } else if (Math.abs(diffInSeconds) >= 86400) {
                    timeValue = Math.floor(diffInSeconds / 86400)
                    timeUnit = 'day'
                }

                return rtf.format(-timeValue, timeUnit) // Negate the timeValue to correct the sign
            }
        }
    })
})
