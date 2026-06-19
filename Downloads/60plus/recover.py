import json
import sys

log_file = r'C:\Users\sanje\.gemini\antigravity-ide\brain\95efea4f-7975-43ef-8ffd-c43bc4bf8358\.system_generated\logs\transcript.jsonl'
with open(log_file, encoding='utf-8') as f:
    for line in f:
        try:
            obj = json.loads(line)
            if obj.get('source') == 'MODEL' and 'tool_calls' in obj:
                for tc in obj['tool_calls']:
                    if tc['name'] in ['multi_replace_file_content', 'replace_file_content']:
                        args = tc.get('args', {})
                        target = args.get('TargetFile', '')
                        if 'PremiumLanding.jsx' in target:
                            print(f'\\n--- STEP {obj.get("step_index")} ---')
                            if 'ReplacementChunks' in args:
                                print(args['ReplacementChunks'])
                            elif 'ReplacementContent' in args:
                                print(args['ReplacementContent'])
        except Exception as e:
            pass
