package com.iqoo.nivasaai.service

import com.iqoo.nivasaai.model.*

object AIEngine {
    private const val ELECTRICITY_RATE = 8.50

    fun interpretCommand(userText: String, currentDevices: List<Device>): ActionPlan {
        val lower = userText.lowercase()
        return when {
            "leaving" in lower || "departure" in lower -> generateLeavingPlan(userText, currentDevices)
            "sleep" in lower || "night" in lower -> generateSleepPlan(userText, currentDevices)
            else -> generateEnergyPlan(userText, currentDevices)
        }
    }

    private fun generateLeavingPlan(prompt: String, devices: List<Device>): ActionPlan {
        val changes = mutableListOf<ProposedDeviceChange>()
        var savedWatts = 0

        devices.forEach { dev ->
            if (dev.roomId == RoomId.LIVING && dev.state == DeviceState.ON) {
                changes.add(
                    ProposedDeviceChange(
                        deviceId = dev.id,
                        deviceName = dev.name,
                        roomName = dev.roomName,
                        fromState = dev.state,
                        toState = DeviceState.OFF,
                        action = "Power OFF to prevent empty room waste"
                    )
                )
                savedWatts += dev.powerWatt
            } else if (dev.type == DeviceType.AC && dev.state == DeviceState.ON) {
                changes.add(
                    ProposedDeviceChange(
                        deviceId = dev.id,
                        deviceName = dev.name,
                        roomName = dev.roomName,
                        fromState = dev.state,
                        toState = DeviceState.ON,
                        fromMode = dev.mode,
                        toMode = "Eco 26°C",
                        action = "Switch AC to Eco Mode 26°C"
                    )
                )
                savedWatts += (dev.powerWatt * 0.6).toInt()
            }
        }

        val energyDelta = (savedWatts * 2.0) / 1000.0
        val costDelta = energyDelta * ELECTRICITY_RATE

        return ActionPlan(
            id = "plan_${System.currentTimeMillis()}",
            title = "Temporary Departure Guard",
            userPrompt = prompt,
            intent = "LEAVING_HOME",
            reasoning = "Detected departure of ~2 hours. Shutting down idle living room appliances and setting AC to Eco 26°C.",
            proposedChanges = changes,
            impactPreview = ImpactPreview(
                energyDeltaKWh = -energyDelta,
                costDeltaRs = -costDelta,
                devicesAffected = changes.size,
                comfortImpact = "Low",
                safetyImpact = "Improved",
                durationHours = 2
            ),
            timestamp = "10:45 PM"
        )
    }

    private fun generateSleepPlan(prompt: String, devices: List<Device>): ActionPlan {
        return ActionPlan(
            id = "plan_sleep",
            title = "Sleep Mode Plan",
            userPrompt = prompt,
            intent = "SLEEP_MODE",
            reasoning = "Sets Bedroom AC to 25°C Eco, turns off living room lights & TV, and locks entrance door.",
            proposedChanges = emptyList(),
            impactPreview = ImpactPreview(-0.41, -3.50, 4, "High", "Improved", 7),
            timestamp = "11:00 PM"
        )
    }

    private fun generateEnergyPlan(prompt: String, devices: List<Device>): ActionPlan {
        return ActionPlan(
            id = "plan_energy",
            title = "Energy Waste Mitigation",
            userPrompt = prompt,
            intent = "ENERGY_SAVE",
            reasoning = "Identified idle living room power draw. Turning off idle lamps and adjusting thermostat.",
            proposedChanges = emptyList(),
            impactPreview = ImpactPreview(-0.65, -5.20, 3, "Optimal", "Neutral", 4),
            timestamp = "11:15 PM"
        )
    }
}
