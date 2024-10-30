Transforms = {
	["was"] = "waz",
	["what"] = "wat",
	["me"] = "meez",
	["is"] = "iz"
}

Additions = {"🐘", "🦔", "dum"}

Handlers.add(
		"Dumify",
		Handlers.utils.hasMatchingTag("Action", "Dumify"),
		function(msg)
				local message = msg.Data
				for original, replacement in pairs(Transforms) do
						message = message:gsub(original, replacement)
				end    
				local dumified_message = message .. Additions[math.random(#Additions)]
				Handlers.utils.reply(dumified_message)(msg)
		end
)